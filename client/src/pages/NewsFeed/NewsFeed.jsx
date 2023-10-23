import "./NewsFeed.scss";

import { Link } from "react-router-dom";
import CreateNewPost from "../../components/posts/CreateNewPost";
import GetAllPosts from "../../components/posts/GetAllPosts";
import Menu from "../../components/Menu/Menu";

const Home = () => {
  return (
    <div className="home">
      <h1>Newsfeed</h1>
      <Link to="/company/profile">view company profile</Link>
      <CreateNewPost />
      <GetAllPosts />

      <Menu/>
    </div>
  );
};

export default Home;
