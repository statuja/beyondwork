import { Schema, model } from "mongoose";

const addressSchema = new Schema(
  {
    zipCode: String,
    country: String,
    city: String,
    address: String,
  },
  { _id: false }
);

const contactSchema = new Schema(
  {
    phoneNumber: { type: String }, //required?
    email: { type: String, unique: true },
  },
  { _id: false }
);

const companySchema = new Schema(
  {
    companyName: { type: String, required: true },
    companyType: { type: String, required: true },
    numberOfEmployees: String,
    companyAddress: { type: addressSchema, required: true },
    companyContact: { type: contactSchema, required: true },
    defaultAdminEmail: String, // unique?
  },
  { versionKey: false }
);

const Company = model("Company", companySchema);
export default Company;
