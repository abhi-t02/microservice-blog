import { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://posts.com/api/posts/create", {
        title,
      })
      .then((data) => {
        setTitle("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form className="w-12" onSubmit={submitHandler}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default PostCreate;
