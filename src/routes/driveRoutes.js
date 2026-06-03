import express from "express";

import {
  getDrives,
  getDriveById,
  createDrive,
  updateDrive,
  deleteDrive,
} from "../controllers/driveController.js";

const router = express.Router();

router.post("/", createDrive);

router.get("/", getDrives);

router.get("/:id", getDriveById);

router.patch("/:id", updateDrive);

router.delete("/:id", deleteDrive);

export default router;