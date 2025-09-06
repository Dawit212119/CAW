import { Router } from "express";
import {
  signUp,
  updateProfile,
  checkAuth,
  login,
  logout,
} from "../controllers/auth.controller";
import { protectRoute } from "../middleware/protectRoute";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/signout", logout);
router.patch("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);
export default router;
