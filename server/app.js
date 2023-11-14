import companyRoute from "./routes/companyRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",

  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.options("*", cors(corsOptions));

//Routes
app.use(express.static("public"));
app.use("/company", companyRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);

mongoose
  .connect(process.env.MONGO_DB_LINK)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err.message));

app.listen(process.env.PORT, () => {
  console.log(`API started up on http://localhost:${process.env.PORT}`);
});
