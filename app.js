import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
const app = express();

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("working");
});

app.listen(process.env.PORT);
