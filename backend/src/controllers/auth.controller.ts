import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateTOken } from "../lib/generateToken";
export const signUp = async (req: Request, res: Response) => {
  const { fullname, email, password } = req.body;
  console.log(req.body);
  try {
    if (!password || !fullname || !email) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 character",
      });
    }
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ message: "user exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: String(hashPassword),
      fullname,
    });
    if (newUser) {
      generateTOken(String(newUser._id), res);
      await newUser.save();
    }
    res.status(201).json({
      id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({ message: error.message });
    }
    res.json({ message: "Internal server error!" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
  } catch (error) {}
};
