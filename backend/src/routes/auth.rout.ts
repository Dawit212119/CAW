import { Router } from "express";
import {
  signUp,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller";
import { protectRoute } from "../middleware/protectRoute";

const router = Router();

router.post("/signup", signUp);
router.post("/login", (req, res) => {
  res.send("login success");
});
router.post("/signout", (req, res) => {
  res.send("signout");
});
router.patch("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);
export default router;
