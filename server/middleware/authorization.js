import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authorization = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const currentUser = await User.findById(decodedToken.userId);
    req.user = currentUser;
    next();
  } catch (error) {
    console.log(`error authorization ${error.message}`);
    res.json({ success: false, error: error.message });
  }
};

export default authorization;
