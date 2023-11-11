import express from "express";
import multer from "multer";

import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getOnePost,
  getUserPosts,
  likePost,
} from "../controllers/postControllers.js";
import authorization from "../middleware/authorization.js";

const router = express.Router();

//image storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/post/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});
//

router.post("/create", authorization, upload.single("image"), createPost);

router.get("/all", authorization, getAllPosts);

router.get("/getUsersPosts/:id", authorization, getUserPosts);

router.get("/getOne/:postId", authorization, getOnePost);

router.delete("/delete/:postId", authorization, deletePost);

router.post("/edit/:postId", authorization, editPost);

router.post("/like/:postId/:userId", authorization, likePost);

export default router;
