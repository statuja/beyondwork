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
import { useContext } from "react";
import MyContext from "./context/MyContext";

function App() {
  const { userData } = useContext(MyContext);
  const Layout = () => {
    if (!userData._id) {
      return (
        <div>
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      );
    } else {
      return (
        <div>
          <Topbar />
          <Menu />
          <Outlet />
          <Footer />
        </div>
      );
    }
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/company/create",
          element: <CompanyRegistration />,
        },
        {
          path: "/company/thankyou",
          element: <ThankYou />,
        },
        {
          path: "/user/login",
          element: <Login />,
        },
        {
          path: "/user/create",
          element: <UserRegistration />,
        },
        {
          path: "/newsfeed",
          element: <NewsFeed />,
        },
        {
          path: "/create/post",
          element: <CreateNewPost />,
        },
        {
          path: "/all/post",
          element: <GetAllPosts />,
        },
        {
          path: "/savedposts",
          element: <SavedPosts />,
        },
        {
          path: "/company/profile",
          element: <CompanyProfile />,
        },
        {
          path: "/updateCompanyProfile",
          element: <EditCompanyProfile />,
        },
        {
          path: "/user/profile/:id",
          element: <MyProfile />,
        },
        {
          path: "/allusers",
          element: <AllUsers />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
