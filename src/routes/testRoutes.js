import express from "express";
import { fetchPlacementData } from "../services/dataService.js";

const router = express.Router();

router.get("/test", async (req, res) => {
  try {
    const data = await fetchPlacementData();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;