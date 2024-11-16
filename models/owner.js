import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  cart: [],
  isAdmin: Boolean,
  orders: [],
  contact: Number,
  picture: String,
});

export const Owner = mongoose.model("owner", ownerSchema);
