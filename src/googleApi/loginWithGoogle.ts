import express from "express";
import passport from "passport";
const router = express.Router();

const successLoginUrl = "http://localhost:3000/login/success";
const errorLoginUrl = "http://localhost:3000/login/error";

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
  (req: any, res: any) => {
    console.log("User: ", req.user);
    res.json("Thank you for signing in!");
  }
);

router.get("/login/success", (req, res) => {
  res.redirect("http://127.0.0.1:3000/blog/create");

});

module.exports = router;
