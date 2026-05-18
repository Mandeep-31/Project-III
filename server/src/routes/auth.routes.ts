import { Router } from "express";

import {
  register,
  login,
  verifyOTP
} from "../controllers/auth.controller";

import { authenticate } from "../middleware/auth.middleware";
const router = Router();
router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);

router.get("/test", (req, res) => {
  res.json({
    message: "Auth route working",
  });
});

router.get("/me", authenticate, (req, res) => {
  res.json({
    message: "Protected route accessed"
  });
});

export default router;