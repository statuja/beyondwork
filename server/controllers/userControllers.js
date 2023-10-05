import express from "express";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

export const createUser = async (req, res) => {
  try {
    const { userPassword } = req.body;
    const salt = bcrypt.genSaltSync(process.env.SALT);
    const hashedPassword = bcrypt.hashSync(userPassword, salt);
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
