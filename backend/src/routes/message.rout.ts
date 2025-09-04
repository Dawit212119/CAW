import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute";
import {
  getMessages,
  getUsers,
  sendMessages,
} from "../controllers/message.controller";

const router = Router();

router.get("/Users", protectRoute, getUsers);
router.get("/:id", protectRoute, getMessages);
router.post("/:id", protectRoute, sendMessages);

export default router;
