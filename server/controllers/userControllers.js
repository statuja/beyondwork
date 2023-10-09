import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const SALT_ROUNDS = 9;

export const createUser = async (req, res) => {
  try {
    const { userPassword } = req.body;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    req.body.userPassword = hashedPassword;
    const newUser = await User.create({
      ...req.body,
      userPassword: hashedPassword,
    });
    res.json(newUser);
  } catch (error) {
    res.json(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ "userContact.email": email });

    if (!user) {
      throw new Error("This E-mail is not valid. Please, try again.");
      return;
    }

    const passwordCheck = bcrypt.compareSync(password, user.userPassword);

    if (!passwordCheck) {
      throw new Error("This Password is not valid. Please, try again.");
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1hour",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.json({ user: user, token: token });
  } catch (error) {
    res.json(error.message);
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

export const logout = async (req, res) => {};

export const getMyProfile = async (req, res) => {};

export const updateMyProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });

    res.json(updatedUser);
  } catch (error) {
    res.json(error.message);
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const selectedUser = await User.findById(req.params.id);

    res.json(selectedUser);
  } catch (error) {
    res.json(error.message);
  }
};

export const deleteUser = async (req, res) => {};
