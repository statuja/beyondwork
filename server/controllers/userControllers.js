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
    req.body.userPassword = hashedPassword; // replace the userPassword field in the req.body with the hashed password before creating the new user. This approach modifies the req.body object to include the hashed password.
    const newUser = await User.create({
      ...req.body,
      userPassword: hashedPassword, //directly include the userPassword: hashedPassword field when creating the new user. This approach does not modify the req.body object and includes the hashed password directly in the User.create call.
    }); // lines 17 and 19 achieve the same result
    console.log(newUser);
    res.json(newUser);
  } catch (error) {
    res.json(error.message);
  }
  console.log("end");
};

export const createDefaultAdmin = async (companyId, adminEmail) => {
  try {
    const userPassword = defaultPass;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(userPassword, salt);
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
      return res.status(400).json({
        error:
          "The email is not associated with any account. Please try again.",
      });
    }
    const passwordCheck = bcrypt.compareSync(password, user.userPassword);
    if (!passwordCheck) {
      return res.status(400).json({
        error: "The password you entered is incorrect. Please try again.",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log(`token: ${token}`);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json({ user: user, token: token });
    console.log(user.userCompany);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const allUsers = async (req, res) => {
  const { companyId } = req.params;
  try {
    const users = await User.find({ userCompany: companyId }).populate(
      "userCompany"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
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

export const savePost = async (req, res) => {
  try {
    const usersId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      usersId,
      {
        $push: { savedPosts: req.body.postId },
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    res.json(error.message);
  }
};

export const getSavedPosts = async (req, res) => {
  try {
    const usersId = req.user._id;

    const savedPosts = await User.findById(usersId)
      .select("savedPosts")
      .populate("savedPosts");

    res.json(savedPosts);
  } catch (error) {
    res.json(error.message);
  }
};
