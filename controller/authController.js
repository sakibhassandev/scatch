import { userModel } from "../models/user.js";

import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (user) {
      req.flash("error", "User already exists please login");
      return res.status(406).redirect("/");
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).send(err.message);
      bcrypt.hash(password, salt, async (err, encrypted) => {
        if (err) return res.status(500).send(err.message);
        const user = await userModel.create({
          fullName,
          email,
          password: encrypted,
        });

        const token = generateToken(user);
        res.cookie("token", token);
        res.status(201).redirect("/shop");
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      req.flash("error", "Email or password is incorrect");
      return res.status(404).redirect("/");
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(500).send(err.message);
      if (!result) {
        req.flash("error", "Email or password is incorrect");
        return res.status(404).redirect("/");
      }
      const token = generateToken(user);
      res.cookie("token", token);
      res.status(200).redirect("/shop");
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "");
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
