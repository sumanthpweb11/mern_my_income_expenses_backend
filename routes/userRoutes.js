import express from "express";
import { login, register } from "../controllers/userControllers.js";

const router = express.Router();

// Login
router.route("/login").post(login);

// Register
router.route("/register").post(register);

export default router;
