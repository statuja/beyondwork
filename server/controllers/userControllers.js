import express from "express";
import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const newUser = await User.create({ ...req.body }).populate("userCompany");
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
