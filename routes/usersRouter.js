import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controller/authController.js";

router.get("/", (req, res) => {
  res.status(200).send("hey its working");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

export default router;
