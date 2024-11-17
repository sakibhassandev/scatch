import express from "express";
const router = express.Router();

import bcrypt from "bcrypt";
import { ownerModel } from "../models/owner.js";
import { productModel } from "../models/product.js";
import { loginOwner, logoutOwner } from "../controller/authController.js";
import { isAdmin } from "../middlewares/isAdmin.js";

// creating a new owner
if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res
        .status(503)
        .send("You don't have permission to create a new owner");
    }
    const { fullName, email, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).send("something went wrong");
      bcrypt.hash(password, salt, async (err, encrypted) => {
        if (err) return res.status(500).send("something went wrong");
        const newOwner = await ownerModel.create({
          fullName,
          email,
          password: encrypted,
        });
        res.status(201).send(newOwner);
      });
    });
  });
}

router.get("/", (req, res) => {
  res.status(200).send("hey its working");
});

router.get("/admin", isAdmin, async (req, res) => {
  const products = await productModel.find();
  const success = req.flash("success");
  res.render("admin", { success, products });
});

router.get("/create", isAdmin, (req, res) => {
  res.render("createproducts");
});

router.get("/login", (req, res) => {
  const error = req.flash("error");
  res.render("owner-login", { error });
});

router.post("/admin/login", loginOwner);

router.post("/admin/logout", logoutOwner);

export default router;
