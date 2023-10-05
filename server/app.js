import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import companyRoute from "./routes/companyRoute.js";
import userRoute from "./routes/userRoute.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//Routes

app.use("/company", companyRoute);
app.use("/user", userRoute);

app.post("/server/test", (req, res) => {
  console.log(req.body);
  res.json("Yes server is connected with client now!");
});

mongoose
  .connect(process.env.MONGO_DB_LINK)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err.message));

app.listen(process.env.PORT, () => {
  console.log(`API started up on http://localhost:${process.env.PORT}`);
});
