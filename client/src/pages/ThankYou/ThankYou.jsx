import "./ThankYou.scss";
import logo from "../../images/Logo_green.png";
import Login from "../../pages/Login/Login";
import { useContext } from "react";
import MyContext from "../../context/MyContext";

export const ThankYou = () => {
  const { adminEmail } = useContext(MyContext);
  const { companyName } = useContext(MyContext);
  return (
    <div className="thankyou">
      <div className="left">
        <div className="logo">
          <img src={logo} alt="BeyondWork Logo" />{" "}
        </div>
        <h1>Thank you for registering your company with BeyondWork!</h1>
        <p>You have successfully registered your company.</p>
        <p>
          Now you can login with your personal profile, and start registering
          employees in your team.
        </p>
      </div>
      <div className="right">
        <h2>Login to {companyName} admin account</h2>
        <p>
          Here is your Admin email <b>{adminEmail}</b> and your temporary
          password:
          <b> admin1234</b>.
          <br /> <i>Please make sure to change your password! </i>
        </p>
        <Login />
      </div>
    </div>
  );
};
