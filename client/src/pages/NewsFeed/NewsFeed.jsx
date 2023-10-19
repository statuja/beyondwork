import "./NewsFeed.scss";

import { Link } from "react-router-dom";
import CreateNewPost from "../../components/posts/CreateNewPost";
import GetAllPosts from "../../components/posts/GetAllPosts";

const Home = () => {
  return (
    <div className="home">
      <h1>Newsfeed</h1>
      <Link to="/company/profile">view company profile</Link>
      <CreateNewPost />
      <GetAllPosts />
    </div>
  );
};

export default Home;
