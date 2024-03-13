// import { useState, useEffect } from "react";
// import axios from "axios";

const CommentList = ({ comments }) => {
  // const [comments, setComments] = useState([]);

  // const fetchComments = async () => {
  //   const res = await axios.get(
  //     `http://localhost:3002/api/posts/${postId}/comments`
  //   );
  //   setComments(res.data);
  //   console.log(comments);
  // };

  // useEffect(() => {
  //   fetchComments();
  // }, []);

  const renderComments = comments.map((comment) => {
    const content =
      comment.status === "Approved"
        ? comment.conetent
        : "This comment has been rejected.";
    console.log(content);
    return <li key={comment.id}>{content}</li>;
  });

  return (
    <>
      <div>Comments</div>
      <ul>{renderComments}</ul>
    </>
  );
};

export default CommentList;
