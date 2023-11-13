import React, { useContext } from "react";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import { CompanyRegistration } from "./pages/CompanyRegistration/CompanyRegistration";
import Login from "./pages/Login/Login";
import { UserRegistration } from "./pages/CreateUser/CreateUser";
import { ThankYou } from "./pages/ThankYou/ThankYou";
import NewsFeed from "./pages/NewsFeed/NewsFeed";
import CompanyProfile from "./pages/CompanyProfile/CompanyProfile";
import MyProfile from "./pages/UserProfile/MyProfile";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";
import CreateNewPost from "./components/posts/CreateNewPost";
import AllUsers from "./pages/AllUsers/AllUsers";
import GetAllPosts from "./components/posts/GetAllPosts";
import SavedPosts from "./components/posts/SavedPosts";
import EditCompanyProfile from "./pages/CompanyProfile/EditCompanyProfile";
import Topbar from "./components/Topbar/Topbar";
import Menu from "./components/Menu/Menu";
import EditMyProfile from "./pages/UserProfile/EditMyProfile";
import MarketPlace from "./pages/marketPlace/Marketplace";
import MyContext from "./context/MyContext";
import ScrollToTop from "./components/ScrollToTop"; // Add this line to import the ScrollToTop component

function App() {
  const { isDarkMode } = useContext(MyContext);
  React.useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const routes = [
    // Main Layout Routes
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Login /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/company/create", element: <CompanyRegistration /> },
        { path: "/company/thankyou", element: <ThankYou /> },
        { path: "/user/login", element: <Login /> },
      ],
    },
    // User Layout Routes
    {
      path: "/",
      element: <UserLayout />,
      children: [
        { path: "/user/create", element: <UserRegistration /> },
        { path: "/newsfeed", element: <NewsFeed /> },
        { path: "/create/post", element: <CreateNewPost /> },
        { path: "/all/post", element: <GetAllPosts /> },
        { path: "/savedposts", element: <SavedPosts /> },
        { path: "/company/profile", element: <CompanyProfile /> },
        { path: "/updateCompanyProfile", element: <EditCompanyProfile /> },
        { path: "/user/profile/:id", element: <MyProfile /> },
        { path: "/user/editmyprofile", element: <EditMyProfile /> },
        { path: "/allusers", element: <AllUsers /> },
        { path: "/marketplace", element: <MarketPlace /> },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

const MainLayout = () => (
  <>
    <ScrollToTop />
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const UserLayout = ({ isDarkMode }) => (
  <div className={isDarkMode ? "dark-mode" : "light-mode"}>
    <ScrollToTop />
    <Topbar />
    <div className={`content ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="contentCont">
        <Outlet />
      </div>
      <div className="menuCont">
        <Menu />
      </div>
    </div>
    <Footer />
  </div>
);
