import { Router } from "express";
import {
  signUp,
  updateProfile,
  checkAuth,
  login,
} from "../controllers/auth.controller";
import { protectRoute } from "../middleware/protectRoute";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/signout", (req, res) => {
  res.send("signout");
});
router.patch("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);
export default router;
