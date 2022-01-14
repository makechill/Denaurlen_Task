import express from "express";
import { createUser, getUser, updateUser } from "../controllers/posts.js";

const router = express.Router();

router.get("/user", getUser);
router.post("/user", createUser);
router.put("/update", updateUser);

export default router;
