import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";



require("dotenv").config();


const connections = require("./connections");
const blogAPI = require("./BlogApi/userLogin");
const blogCRUD = require("./BlogApi/blogCRUD");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());



app.use(helmet());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Authorization")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  
  next();
  });


app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "bla bla bla",
  })
);

app.get("/", (req: any, res: any) => {
  res.redirect("/blog");
});


app.use("/", blogCRUD)
app.use("/", blogAPI)
app.use(connections.notFound);
app.use(connections.errorHandler);

module.exports = app;
