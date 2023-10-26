import "./NewsFeed.scss";
import { useContext } from "react";
import MyContext from "../../context/MyContext";
import CreateNewPost from "../../components/posts/CreateNewPost";
import GetAllPosts from "../../components/posts/GetAllPosts";

const Home = () => {
  const { userData } = useContext(MyContext);

  return (
    <>
   
     
        <div className="newsfeed">
          <h1>News feed</h1>
          <CreateNewPost />  
          <p>
            Hello <b>{userData.userFullName}</b>, here is the latest news from
            your colleagues
          </p>
            <GetAllPosts />  
        </div>
        
    
    </>
  );
};

export default Home;
