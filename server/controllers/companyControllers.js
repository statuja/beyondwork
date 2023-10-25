import Company from "../models/Company.js";
import { createDefaultAdmin } from "../controllers/userControllers.js";

export const createCompany = async (req, res) => {
  try {
    const newCompany = await Company.create(req.body);
    const defaultAdminUser = createDefaultAdmin(
      newCompany._id,
      newCompany.defaultAdminEmail
    );
    res.status(201).json(newCompany);
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const viewCompanyProfile = async (req, res) => {
  try {
    const company = await Company.findById(req.user.userCompany);
    const { companyLogo, ...rest } = company._doc; // Extract the logo URL and other details
    const companyData = {
      ...rest,
      companyLogo: companyLogo, // Send the logo URL in the response
    };
    res.json(companyData);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const updateCompanyProfile = async (req, res) => {
  try {
    const updatedCompanyData = { ...req.body };
    const logo = req.file;
    if (logo) {
      updateCompanyProfile.companyLogo = logo.path;
    }
    const updatedCompany = await Company.findByIdAndUpdate(
      req.user.userCompany,
      updatedCompanyData,
      { new: true }
    );

    res.json(updatedCompany);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
