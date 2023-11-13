import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import companyRoute from "./routes/companyRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
// import bodyParser from 'express'
dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
  // process.env.NODE_ENV === "production"
  //   ? "vercel server" //change when we deploy
  //   : "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",

  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200,
};
// console.log(`corsoption: ${corsOptions.origin}`);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// // Increase payload size limit
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// Handle preflight requests
app.options("*", cors(corsOptions));
// Set up the necessary headers in the preflight response
// app.options("*", cors(corsOptions), (req, res) => {
//   res.set("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.set("Access-Control-Allow-Methods", "POST");
//   res.set("Access-Control-Allow-Methods", "PUT");
//   res.set("Access-Control-Allow-Methods", "DELETE");
//   res.set("Access-Control-Allow-Methods", "GET");
//   res.set("Access-Control-Allow-Headers", "Content-Type");
//   res.status(200).send();
// });

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
