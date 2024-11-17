import express from "express";
const router = express.Router();

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { productModel } from "../models/product.js";

router.get("/", (req, res) => {
  if (req.cookies.token) {
    return res.redirect("/shop");
  }
  const error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  const products = await productModel.find();
  res.render("shop", { products });
});

export default router;
