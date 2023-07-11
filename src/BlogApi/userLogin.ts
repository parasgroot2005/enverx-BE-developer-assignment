import express from "express";


const router = express.Router();

router.get("/blog",  (req, res) => {
  res.send("Welcome to BLOG");
});

module.exports = router;