import Company from "../models/Company.js";

export const createCompany = async (req, res) => {
  try {
    const newCompany = await Company.create(req.body);
    res.json(newCompany);
  } catch (error) {
    res.json(error);
  }
};

export const viewCompanyProfile = async (res, req) => {};
export const updateCompanyProfile = async (res, req) => {};
