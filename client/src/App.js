// import React from "react";

import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  return (
    <div className="container">
      <div className="w-25">
        <h1>Blog Appp !</h1>
        <PostCreate />
      </div>
      <hr />
      <h1>Posts</h1>
      <PostList />
    </div>
  );
};

export default App;
