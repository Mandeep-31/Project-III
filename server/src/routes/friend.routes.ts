import { Router } from "express";

import { authenticate }
from "../middleware/auth.middleware";

import {
  sendFriendRequest
} from "../controllers/friend.controller";

const router = Router();

router.post(
  "/request",
  authenticate,
  sendFriendRequest
);

export default router;