import express from "express";

import {
  getInterviews,
  getInterviewById,
  createInterview,
  updateInterview,
  deleteInterview,
} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/", createInterview);

router.get("/", getInterviews);

router.get("/:id", getInterviewById);

router.patch("/:id", updateInterview);

router.delete("/:id", deleteInterview);

export default router;
