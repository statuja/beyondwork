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
    phoneNumber: String,
    email: String,
  },
  { _id: false }
);

const companySchema = new Schema(
  {
    companyName: { type: String, required: true },
    companyType: { type: String, required: true },
    numberOfEmployees: { type: String, required: true },
    companyAddress: { type: addressSchema, required: true },
    companyContact: { type: contactSchema, required: true },
  },
  { versionKey: false }
);

const Company = model("Company", companySchema);
export default Company;
