import { Router } from "express";

import {
  authenticate
} from "../middleware/auth.middleware";

import {
  sendFriendRequest,
  getPendingRequests,
  acceptFriendRequest,
  getFriends
} from "../controllers/friend.controller";

const router = Router();

router.post(
  "/request",
  authenticate,
  sendFriendRequest
);

router.get(
  "/pending",
  authenticate,
  getPendingRequests
);


router.post(
  "/accept",
  authenticate,
  acceptFriendRequest
);
router.get(
  "/all",
  authenticate,
  getFriends
);
export default router;