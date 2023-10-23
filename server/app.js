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
  origin:
    process.env.NODE_ENV === "production"
      ? "vercel server" //change when we deploy
      : "http://localhost:3000",
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200,
};
console.log(`corsoption: ${corsOptions.origin}`);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

//Routes

app.use("/company", companyRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);

app.post("/server/test", (req, res) => {
  console.log(req.body);
  res.json("Yes server is connected with client now!");
}); //do we need this part?

mongoose
  .connect(process.env.MONGO_DB_LINK)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err.message));

app.listen(process.env.PORT, () => {
  console.log(`API started up on http://localhost:${process.env.PORT}`);
});
