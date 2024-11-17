import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: Buffer,
  name: String,
  price: String,
  discount: {
    type: Number,
    default: "0",
  },
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
});

export const productModel = mongoose.model("product", productSchema);
