// src/App.js
import React, { useState, useEffect } from "react";

// import API from Amplify library
import { API, Auth } from "aws-amplify";

// import query definition
import { listPosts } from "./graphql/queries";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function App({ signOut, user }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
    checkUser();
  }, []);
  async function fetchPosts() {
    try {
      const postData = await API.graphql({ query: listPosts });
      setPosts(postData.data.listPosts.items);
    } catch (err) {
      console.log({ err });
    }
  }
  async function checkUser() {
    const user = await Auth.currentAuthenticatedUser();
    console.log("user:", user);
    console.log("user attributes: ", user.attributes);
  }
  return (
    <div>
      <h1>Hello World</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.name}</h3>
          <p>{post.location}</p>
          <p>{post.description}</p>
        </div>
      ))}
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}


export default withAuthenticator(App);