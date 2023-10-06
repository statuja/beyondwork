import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const SALT_ROUNDS = 9

export const createUser = async (req, res) => {
  try {
    const { userPassword } = req.body;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    req.body.userPassword = hashedPassword
    const newUser = await User.create({
      ...req.body,
      userPassword: hashedPassword,
    });
    res.json(newUser);
  } catch (error) {
    res.json(error);
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await User.find().populate("userCompany");
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};
