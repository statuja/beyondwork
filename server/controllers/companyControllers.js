import Company from "../models/Company.js";
import User from "../models/User.js";

export const createCompany = async (req, res) => {
  try {
    const newCompany = await Company.create(req.body);
    res.json(newCompany);
  } catch (error) {
    res.json(error);
  }
};


export const viewCompanyProfile = async (req, res) => {
  //res.json(req.user);
};

export const updateCompanyProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you store the user's ID in req.user._id

    // First, find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the associated company data
    const updatedCompanyData = req.body; // Assuming the request body contains the updated company data

    // Now, update the company associated with the user
    const updatedCompany = await Company.findByIdAndUpdate(
      user.userCompany, // ID of the associated company
      updatedCompanyData,
      { new: true }
    );

    res.json(updatedCompany);
  } catch (error) {
    res.json({ error: error.message });
  }
};



