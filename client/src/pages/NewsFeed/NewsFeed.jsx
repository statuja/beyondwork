import "./NewsFeed.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import MyContext from "../../context/MyContext";
import CreateNewPost from "../../components/posts/CreateNewPost";
import GetAllPosts from "../../components/posts/GetAllPosts";
import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";
import Topbar from "../../components/Topbar/Topbar";

const Home = () => {
  const { userData } = useContext(MyContext);

  return (
    <>
   
      <div className="home">
        <div className="newsfeed">
          <h1>Newsfeed</h1>
          <Link to="/company/profile">view company profile</Link>
          <CreateNewPost />
          <p>
            Hello <b>{userData.userFullName}</b>, here is the latest feeds from
            your colleagues
          </p>
          <GetAllPosts />
        </div>
        <div className="leftmenu">
        
        </div>
      </div>
    
    </>
  );
};

export default Home;
