import express from "express";

import {
  getStudentAnalytics,
  getCompanyAnalytics,
  getApplicationAnalytics,
  getDepartmentAnalytics,
  getPlacementAnalytics,
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

router.get(
  "/departments",
  getDepartmentAnalytics
);

router.get(
  "/placements",
  getPlacementAnalytics
);

export default router;