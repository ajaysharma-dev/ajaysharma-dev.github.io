import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";
const router = express.Router();

router.get(
  "/me",
  verifyToken,
  async (req: Request, res: Response): Promise<any> => {
    const userId = req.userId;
    try {
      const loggedInUser = await User.findById(userId).select("-password");
      if (!loggedInUser) {
        return res.status(400).json({ message: "User not found!" });
      }
      res.json(loggedInUser);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Something went wrong!" });
    }
  }
);

const register = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      return res.status(400).json({
        message: "User already exists!",
      });
    }
    user = new User(req.body);
    await user.save();
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    return res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
};
// /api/users/register
router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("LastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be of 6 chars or more").isLength({
      min: 6,
    }),
  ],
  register
);

export default router;
