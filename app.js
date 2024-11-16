// Importing express and creating an instance of express
import express from "express";
const app = express();

// Importing dotenv and cookie-parser
import "dotenv/config";
import cookieParser from "cookie-parser";

// Importing express-session and connect-flash
import expressSession from "express-session";
import flash from "connect-flash";

// Importing database connection
import { db } from "./config/mongoose-connection.js";

// Importing routes
import indexRouter from "./routes/indexRouter.js";
import ownersRouter from "./routes/ownersRouter.js";
import productsRouter from "./routes/productsRouter.js";
import usersRouter from "./routes/usersRouter.js";

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(process.env.PORT);
