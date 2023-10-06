import express from "express";
import Company from "../models/Company.js";
import { check, validationResult } from "express-validator";
import { createCompany } from "../controllers/companyControllers.js";

const router = express.Router();

const validation = [
  check("companyContact.email")
    .notEmpty()
    .isEmail()
    .withMessage(
      "E-mail is not valid, please provide a correct e-mail address (example: name@companyxyz.abc)"
    )
    .custom(async (value) => {
      const company = await Company.findOne({ "companyContact.email": value });
      if (company) {
        throw new Error("The e-mail you provided is already in use.");
      }
    }),
];

router.post(
  "/create",
  validation,
  (req, res, next) => {
    const error = validationResult(req);
    if (error.isEmpty()) {
      next();
    } else {
      res.send({ error: error.array()});
    }
  },
  createCompany
);

export default router;
