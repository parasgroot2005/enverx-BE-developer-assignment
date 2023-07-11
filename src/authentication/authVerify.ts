// if user is authenticated the redirected to next page else redirect to login page
import { NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = "TRa4sdYR21ES";

export const saveToken = (googleId: string) => {
  const token = jwt.sign({ googleId }, secret, { expiresIn: "1d" });
  return token;
};

export const ensureAuth = async (req: any, res: any, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      next();
    } else {
      res.status(401).json({ error: "Something Went Wrong" });
    }
  } catch (error) {
    console.log(error);
  }
};
