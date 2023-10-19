import "./NewsFeed.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateNewPost from "../../components/posts/CreateNewPost";
import GetAllPosts from "../../components/posts/GetAllPosts";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const response = await axios.get("/savedPosts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchAllPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="home">
      <h1>Newsfeed</h1>
      <Link to="/company/profile">view company profile</Link>
      <CreateNewPost onPostCreated={handlePostCreated} />
      <GetAllPosts posts={posts} />
    </div>
  );
};

export default Home;
