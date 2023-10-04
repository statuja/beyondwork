import { Schema, model } from "mongoose";

const addressSchema = new Schema({
  zipCode: String,
  country: String,
  city: String,
  address: String,
});

const contactSchema = new Schema({
  phoneNumber: String,
  email: { type: String, required: true, unique: true },
});

const userSchema = new Schema({
  userFullName: { type: String, required: true },
  userJobTitle: { type: String, required: true },
  userDepartment: { type: String, required: true },
  userCompany: { type: Schema.Types.ObjectId, ref: "Company" },
  userAddress: addressSchema,
  userContact: contactSchema,
  userPassword: { type: String, required: true },
  adminRole: { type: Boolean, required: true, default: false },
  userImage: String,
});

const User = model("User", userSchema);
export default User;
