import express from "express";
import { allUsers, createUser } from "../controllers/userControllers.js";

const router = express.Router();
router.post("/create", createUser);
router.get("/allUsers", allUsers);

export default router;
