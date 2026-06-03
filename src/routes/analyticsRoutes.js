import express from "express";

import {
  getStudentAnalytics,
  getCompanyAnalytics,
  getApplicationAnalytics,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get(
  "/students",
  getStudentAnalytics
);

router.get(
  "/companies",
  getCompanyAnalytics
);

router.get(
  "/applications",
  getApplicationAnalytics
);

export default router;