import { randomBytes } from "crypto";

import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json({ limit: "30mb" }));

interface PostType {
  [id: string]: {
    title: string;
    id: string;
  };
}

const posts: PostType = {};

app.get("/api/posts", (req, res) => {
  res.send(posts);
});

app.post("/api/posts/create", async (req, res) => {
  const id = <string>randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    title,
    id,
  };

  await axios.post(`http://event-bus-srv:3003/api/events`, {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).json(posts[id]);
});

app.post("/api/events", (req, res) => {
  console.log(`events: ${req.body.type}`);
  res.send();
});

export default app;
