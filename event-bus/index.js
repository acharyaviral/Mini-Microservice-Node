const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const events = [];

app.post("/event ", (req, res) => {
	const event = req.body;

	events.push(event);

	axios.post("http://localhost:4000/events", event).catch((err) => {});
	axios.post("http://localhost:4001/events", event).catch((err) => {});
	axios.post("http://localhost:4002/events", event).catch((err) => {});
	axios.post("http://localhost:4003/events", event).catch((err) => {});
	//axios.post("http://localhost:4004/events", event).catch((err) => {});

	app.get("/events", (req, res) => {
		res.send(events);
	});

	res.send({ status: "OK" });
});

app.listen(4005, () => {
	console.log("Listening on port 4005");
});
