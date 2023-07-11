import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import { saveToken} from './authentication/authVerify'


require("dotenv").config();
require("./googleApi/passportGoogleSSO");

require("./models/user");

const connections = require("./connections");
const api = require("./googleApi/loginWithGoogle");
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
app.use(express.json());

app.post("/login/google", (req, res) => {
  const { googleId } = req.body;
  
  // Authenticate the user and generate the JWT
  const token = saveToken(googleId);
  
  res.json({ token });
});

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "bla bla bla",
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req: any, res: any) => {
  res.redirect("/login/google");
});

app.use("/", api);
app.use(connections.notFound);
app.use(connections.errorHandler);

module.exports = app;
