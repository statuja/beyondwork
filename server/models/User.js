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
    phoneNumber: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    userFullName: { type: String, required: true },
    userJobTitle: { type: String, required: true },
    userDepartment: { type: String, required: true },
    userCompany: { type: Schema.Types.ObjectId, ref: "Company" },
    userAddress: addressSchema,
    userContact: contactSchema,
    userPassword: { type: String, required: true },
    adminRole: { type: Boolean, default: false },
    userImage: String,
  },
  { versionKey: false }
);

const User = model("User", userSchema);
export default User;
