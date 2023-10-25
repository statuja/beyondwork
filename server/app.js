import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import companyRoute from "./routes/companyRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  // process.env.NODE_ENV === "production"
  //   ? "vercel server" //change when we deploy
  //   : "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",

  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200,
};
console.log(`corsoption: ${corsOptions.origin}`);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Handle preflight requests
app.options("*", cors(corsOptions));
// Set up the necessary headers in the preflight response
app.options("*", cors(corsOptions), (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Methods", "PUT");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).send();
});

//Routes

app.use("/company", companyRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use(express.static("public"));

// image upload
// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "public/images");
//   },
//   filename: function (req, file, callback) {
//     callback(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
// });
// app.use(express.static("/public"));

// app.post("/file/upload", upload.single("file"), (req, res) => {
//   Company.create({ logo: req.file.filename })
//     .then((result) => res.json(result))
//     .catch((err) => console.log(err));
// });

mongoose
  .connect(process.env.MONGO_DB_LINK)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err.message));

app.listen(process.env.PORT, () => {
  console.log(`API started up on http://localhost:${process.env.PORT}`);
});
