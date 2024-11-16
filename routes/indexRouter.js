import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";

router.get("/", (req, res) => {
  if (req.cookies.token) {
    return res.redirect("/shop");
  }
  const error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedIn, (req, res) => {
  res.render("shop");
});

export default router;
