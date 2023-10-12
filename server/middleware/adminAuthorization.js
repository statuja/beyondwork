import dotenv from "dotenv";
dotenv.config();

const isAdmin = (req, res, next) => {
  console.log("check admin");
  if (req.user && req.user.adminRole === true) {
    next();
  } else {
    res.status(403).json({ message: "Access denied" });
  }
};
export default isAdmin;
