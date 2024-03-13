import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());

interface PostsType {
  [id: string]: {
    id: string;
    title: string;
    comments: { id: string; content: string; status: string }[];
  };
}

const posts: PostsType = {};

const handleEvent = (type: string, data: any) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id)!;
    comment.status = status;
  }
};

app.post("/api/events", (req, res) => {
  const { type, data } = req.body;
  console.log(data);
  handleEvent(type, data);
  res.send();
});

app.get("/api/posts", (req, res) => {
  console.log(posts);
  console.log(posts.comments);
  res.send(posts);
});

app.listen(3004, async () => {
  console.log(`Query server is listening on port 3004`);

  const res = await axios.get(`http://event-bus-srv:3003/api/events`);

  for (let event of res.data) {
    console.log(`Processing event: ${event.type}`);
    handleEvent(event.type, event.data);
  }
});
