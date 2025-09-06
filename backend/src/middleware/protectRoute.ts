import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
type decodeType = (JwtPayload | string) & {
  userId: string;
};

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).json({
        message: "token not found",
      });
    }
    const decode: decodeType = jwt.verify(
      token,
      process.env.JWT_SECERT as string
    ) as decodeType;
    if (!decode) {
      return res.status(403).json({
        message: "Invalid Token",
      });
    }
    const user = await User.findById(decode.userId as string).select(
      "-password"
    );
    if (!user) {
    }
    req.user = user?.toObject()!;
    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.json({
        message: error.message,
      });
    }
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
