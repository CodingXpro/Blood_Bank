import express from "express";
import {
  registerController,
  loginController,
  currentUserController,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

//GET CUrrent User

router.get("/current-user", authMiddleware, currentUserController);

export default router;
