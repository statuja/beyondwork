import express from "express";
import User from "../models/User.js";
import { check, validationResult } from "express-validator";
import {
  allUsers,
  createUser,
  loginUser,
  logout,
  getMyProfile,
  updateMyProfile,
  getUserProfile,
  deleteUser,
  savePost,
  unsavePost,
  getSavedPosts,
  getLikedPosts,
} from "../controllers/userControllers.js";
import authorization from "../middleware/authorization.js";
import isAdmin from "../middleware/adminAuthorization.js";
import multer from "multer";

const router = express.Router();

const validation = [
  check("userPassword")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage(
      "The password you provided is not valid, it must be minimum 8 characters long"
    ),
  check("userContact.email")
    .notEmpty()
    .isEmail()
    .withMessage(
      "E-mail is not valid, please provide a correct e-mail address (example: name@companyxyz.abc)"
    )
    .custom(async (value) => {
      const user = await User.findOne({ "userContact.email": value });
      if (user) {
        throw new Error("The e-mail you provided is already in use.");
      }
    }),
];

router.post(
  "/create",
  authorization,
  isAdmin,
  validation,
  (req, res, next) => {
    const error = validationResult(req);
    if (error.isEmpty()) {
      next();
    } else {
      res.send({ error: error.array() });
    }
  },

  createUser
);

//user image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/user/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/allUsers/:companyId", authorization, allUsers);
router.get("/myProfile", authorization, getMyProfile);
router.put(
  "/updateMyProfile/:userId",
  authorization,
  upload.fields([
    { name: "userImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  updateMyProfile
);
router.get("/getUserProfile/:id", authorization, getUserProfile);
router.delete("/deleteUser/:userId", authorization, isAdmin, deleteUser);
router.post("/savePost/:postId", authorization, savePost);
router.delete("/unsavePost/:postId", authorization, unsavePost);
router.get("/savedPosts", authorization, getSavedPosts);
router.get("/likedPosts", authorization, getLikedPosts);

export default router;
