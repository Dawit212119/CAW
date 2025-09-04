import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./lib/db";
import authRoute from "./routes/auth.rout.js";
import { Types } from "mongoose";
declare global {
  namespace Express {
    interface Request {
      user: {
        _id: Types.ObjectId;
        fullname: string;
        userPic: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
      };
    }
  }
}
dotenv.config();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("welcome to home page");
});
app.use("/api/auth", authRoute);
app.listen(process.env.PORT, () => {
  console.log("server start at port", process.env.PORT);
  connectDb();
});

("");
