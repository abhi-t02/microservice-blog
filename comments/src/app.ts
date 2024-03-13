import { randomBytes } from "crypto";

import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

interface CommentsByIdType {
  [id: string]: { content: string; id: string; status: string }[];
}

const commentsById: CommentsByIdType = {};

app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

app.post("/api/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsById[<string>req.params.id] || [];

  comments.push({ id: commentId, content, status: "pending" });
  commentsById[req.params.id] = comments;

  await axios.post(`http://event-bus-srv:3003/api/events`, {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });

  res.status(201).json(comments);
});

app.post("/api/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { id, postId, status, content } = data;

    const comments = commentsById[postId];
    const comment = comments.find((comment) => comment.id === id)!;
    comment.status = status;

    await axios.post(`http://event-bus-srv:3003/api/events`, {
      type: "CommentUpdated",
      data: {
        id,
        status,
        content,
        postId,
      },
    });
  }

  res.send();
});

app.get("/api/posts/:id/comments", (req, res) => {
  const comments = commentsById[req.params.id] || [];
  res.send(comments);
});

export default app;
