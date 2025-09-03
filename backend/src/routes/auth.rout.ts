import { Router } from "express";
import { signUp } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signUp);
router.post("/login", (req, res) => {
  res.send("login success");
});
router.post("/signout", (req, res) => {
  res.send("signout");
});

export default router;
