import express from "express";
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

router.post("/create", authorization, createPost);

router.get("/all", authorization, getAllPosts);

router.get("/getUsersPosts/:id", authorization, getUserPosts);

router.get("/getOne/:postId", authorization, getOnePost);

router.delete("/delete/:postId", authorization, deletePost);

router.put("/edit/:postId", authorization, editPost);

router.post("/like/:postId/:userId", authorization, likePost);

export default router;
