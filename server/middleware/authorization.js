import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const authorization = async (req, res, next) => {
  console.log("start authorization");
  try {
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    const currentUser = await User.findById(decodedToken.userId);

    req.user = currentUser;

    next();
  } catch (error) {
    res.json(error.message);
  }
};

export default authorization;
