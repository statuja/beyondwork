import "./NewsFeed.scss";
import { useContext } from "react";
import MyContext from "../../context/MyContext";
import CreateNewPost from "../../components/posts/CreateNewPost";
import GetAllPosts from "../../components/posts/GetAllPosts";

const Home = () => {
  const { userData } = useContext(MyContext);

  return (
    <>
   
      <div className="home">
        <div className="newsfeed">
          <h1>Newsfeed</h1>
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
