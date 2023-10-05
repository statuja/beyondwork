import express from "express";
import User from "../models/User.js";
import { check } from "express-validator";
import { allUsers, createUser } from "../controllers/userControllers.js";

const router = express.Router();

const validation = [
  check("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("not a valid password"),
  check("email")
    .notEmpty()
    .isEmail()
    .withMessage("email is not valid")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("E-mail already in use");
      }
    })
    .withMessage("email is already in use"),
];

router.post(
  "/create",
  validation,
  (req, res) => {
    const error = validationResult(req);
    if (error.isEmpty()) {
      return res.sendStatus(201);
    }
    res.send({ error: error.array() });
  },
  createUser
);
router.get("/allUsers", allUsers);

export default router;
