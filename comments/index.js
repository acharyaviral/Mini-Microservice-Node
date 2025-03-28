const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const { randomBytes } = require("node:crypto");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Store comments grouped by post ID
const commentsByPostId = {};

// Fetch all comments for a given post ID
app.get("/posts/:id/comments", (req, res) => {
	res.send(commentsByPostId[req.params.id] || []);
});

// Create a new comment for a post
app.post("/posts/:id/comments", async (req, res) => {
	const commentId = randomBytes(4).toString("hex");
	const { content } = req.body;

	// Retrieve existing comments for the post or initialize an empty array
	const comments = commentsByPostId[req.params.id] || [];

	// Add new comment with a default status of "pending"
	comments.push({ id: commentId, content, status: "pending" });

	// Save updated comments back to the object
	commentsByPostId[req.params.id] = comments;

	// Emit an event to the event bus notifying that a comment has been created
	await axios.post("http://localhost:4005/events", {
		type: "CommentCreated",
		data: {
			id: commentId,
			content,
			postId: req.params.id,
			status: "pending",
		},
	});

	res.status(201).send(comments);
});

// Handle incoming events
app.post("/events", async (req, res) => {
	console.log("Received Event:", req.body.type);

	const { type, data } = req.body;

	// Process the CommentModerated event to update the comment status
	if (type === "CommentModerated") {
		const { id, postId, status } = data;

		const comments = commentsByPostId[postId];

		// Find the specific comment by its ID and update its status
		const comment = comments.find((comment) => comment.id === id);
		if (comment) {
			comment.status = status;

			// Emit an event to notify that the comment has been updated
			await axios.post("http://localhost:4005/events", {
				type: "CommentUpdated",
				data: {
					id,
					content: comment.content, // Use existing content
					postId,
					status,
				},
			});
		}
	}

	res.send({});
});

// Start the server
app.listen(4001, () => {
	console.log("Listening on port 4001");
});
