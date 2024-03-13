import { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [comment, setComment] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post(`http://posts.com/api/posts/${postId}/comments`, {
        content: comment,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    setComment("");
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Comment</label>
          <input
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default CommentCreate;
