import express from "express";

import {
  syncData,
} from "../controllers/syncController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/sync",
  authMiddleware,
  (req, res, next) => {
    if (
      req.user &&
      (req.user.role === "admin" ||
        req.user.role === "placement_officer")
    ) {
      return next();
    }
    return res.status(403).json({
      success: false,
      message: "Forbidden: Access denied",
    });
  },
  syncData
);

export default router;