import { ownerModel } from "../models/owner.js";
import jwt from "jsonwebtoken";

export const isAdmin = async (req, res, next) => {
  if (!req.cookies.owner) {
    req.flash("error", "You need to login first");
    return res.redirect("/owners/login");
  }

  try {
    let decoded = jwt.verify(req.cookies.owner, process.env.JWT_SECRET);
    let owner = await ownerModel
      .findOne({ email: decoded.email })
      .select("-password");
    req.owner = owner;
    next();
  } catch (error) {
    req.flash("error", "Something went wrong");
    return res.redirect("/owners/login");
  }
};
