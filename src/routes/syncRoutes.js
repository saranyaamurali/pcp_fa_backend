import express from "express";

import {
  syncData,
} from "../controllers/syncController.js";

const router =
  express.Router();

router.post(
  "/sync",
  syncData
);

export default router;