import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const SALT_ROUNDS = 9;
const defaultPass = process.env.DEFAULT_ADMIN_PASSWORD;

export const createUser = async (req, res) => {
  console.log("start");
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
  console.log("end");
};

export const createDefaultAdmin = async (companyId, adminEmail) => {
  try {
    const userPassword = defaultPass;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    // userPassword = hashedPassword;
    console.log(hashedPassword);
    const newUser = await User.create({
      userContact: {
        email: adminEmail,
      },
      userFullName: "Full Name",
      userJobTitle: "Job Title",
      userDepartment: "Dept",
      adminRole: true,
      userPassword: hashedPassword,
      userCompany: companyId,
    });
    return newUser;
  } catch (error) {
    console.log(error);
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

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "You are now logged out. Bye bye" });
};

export const getMyProfile = async (req, res) => {
  res.json(req.user);
};

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

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.json(error);
  }
};
