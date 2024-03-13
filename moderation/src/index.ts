import axios from "axios";
import express from "express";

const app = express();

app.use(express.json());

app.post("/api/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = (data.content as string).includes("orange")
      ? "Rejected"
      : "Approved";

    await axios.post(`http://event-bus-srv:3003/api/events`, {
      type: "CommentModerated",
      data: {
        content: data.content,
        id: data.id,
        status,
      },
    });
  }

  res.send();
});

app.listen(3005, () => {
  console.log(`Moderation server is listening on port 3005`);
});
