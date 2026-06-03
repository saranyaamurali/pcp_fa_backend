import express from "express";

import {
  getApplications,
  getApplicationById,
} from "../controllers/applicationController.js";

const router =
  express.Router();

router.get(
  "/",
  getApplications
);

router.get(
  "/:id",
  getApplicationById
);

export default router;