import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

// this function performs authentication tasks and initial authorization steps

const authorization = async (req, res, next) => {
  console.log("start authorization");
  try {
    console.log("auth ", req.cookies);
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const currentUser = await User.findById(decodedToken.userId);
    req.user = currentUser;
    next();
  } catch (error) {
    console.log(`error authorization ${error.message}`);
    res.json(error.message);
  }
};

export default authorization;

// In summary, authentication is the process of verifying the user's identity,
//while authorization is the process of granting or denying access to specific resources or
//actions based on that authenticated identity.
//They work together in a security system: authentication ensures the right user is trying to access the system,
//and authorization controls what that user can do once they are authenticated.
