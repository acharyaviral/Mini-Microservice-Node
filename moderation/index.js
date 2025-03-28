const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
	const { type, data } = req.body;

	// check if the comment contains the word 'redacted'
	if (type === "CommentCreated") {
		const status = data.content.includes("redacted") ? "rejected" : "approved";

		await axios.post("http://event-bus-srv:4005/events", {
			type: "CommentModerated",
			data: {
				id: data.id,
				postId: data.postId,
				status,
				content: data.content,
			},
		});
	}

	res.send({});
});

app.listen(4003, () => {
	console.log("Listening on port 4003");
});
