import express from "express";

import {
  getDrives,
  getDriveById,
} from "../controllers/driveController.js";

const router =
  express.Router();

router.get("/", getDrives);

router.get("/:id", getDriveById);

export default router;