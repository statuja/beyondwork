import Company from "../models/Company.js";
import { createDefaultAdmin } from "../controllers/userControllers.js";

export const createCompany = async (req, res) => {
  try {
    const newCompany = await Company.create(req.body);
    const defaultAdminUser = createDefaultAdmin(
      newCompany._id,
      newCompany.defaultAdminEmail
    );
    console.log("Admin user: " + defaultAdminUser.userPassword);
    res.json(newCompany);
  } catch (error) {
    res.json(error);
  }
};

export const viewCompanyProfile = async (req, res) => {
  try {
    const company = await Company.findById(req.user.userCompany);
    res.json(company);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const updateCompanyProfile = async (req, res) => {
  try {
    const updatedCompanyData = req.body;

    const updatedCompany = await Company.findByIdAndUpdate(
      req.user.userCompany,
      updatedCompanyData,
      { new: true }
    );

    res.json(updatedCompany);
  } catch (error) {
    res.json({ error: error.message });
  }
};
