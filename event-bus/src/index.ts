import express from "express";
import axios from "axios";

const app = express();

app.use(express.json());

const events: any = [];

app.post("/api/events", (req, res) => {
  const event = req.body;
  events.push(event);

  axios.post("http://posts-clusterip-srv:3001/api/events", event);
  axios.post("http://query-srv:3004/api/events", event);
  axios.post("http://comments-srv:3002/api/events", event);
  axios.post("http://moderation-srv:3005/api/events", event);

  res.send({ status: "ok" });
});

app.get("/api/events", (req, res) => {
  res.send(events);
});

app.listen(3003, () => {
  console.log(`Bus-event server is listening on port ${3003}`);
});
