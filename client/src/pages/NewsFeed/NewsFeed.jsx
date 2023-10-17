import "./NewsFeed.sass";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home">
      <h1>Newsfeed</h1>
      <Link to="/company/profile">view company profile</Link>
    </div>
  );
};

export default Home;
