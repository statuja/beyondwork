import { Link } from "react-router-dom";
import "./Navbar.scss";
import icon from "../../images/small_icon_green.png";

function Navbar() {
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/user/login">
          <img src={icon} alt="small-icon" />
        </Link>
     
      </div>
      <div className="right">
        <Link to="/about">About us</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
}
export default Navbar;
