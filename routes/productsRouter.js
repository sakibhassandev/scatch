import express from "express";
const router = express.Router();

import { upload } from "../config/multer-config.js";
import { productModel } from "../models/product.js";

router.get("/", (req, res) => {
  res.status(200).send("hey its working");
});

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    const product = await productModel.create({
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
      image: req.file.buffer,
    });
    req.flash("success", "Product created successfully");
    res.redirect("/owners/admin");
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

export default router;
