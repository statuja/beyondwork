import express from "express";
import Company from "../models/Company.js";
import { check, validationResult } from "express-validator";
import { createCompany } from "../controllers/companyControllers.js";

const router = express.Router();

const validation = [
  check("companyContact.email")
    .notEmpty()
    .isEmail()
    .withMessage("email is not valid")
    .custom(async (value) => {
      const company = await Company.findOne({ "companyContact.email": value });
      if (company) {
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
  createCompany
);

export default router;
