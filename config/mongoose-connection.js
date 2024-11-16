import mongoose from "mongoose";

mongoose
  .connect(`${process.env.MONGODB_URI}/scatch`, {
    dbName: "scatch",
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

export const db = mongoose.connection;
