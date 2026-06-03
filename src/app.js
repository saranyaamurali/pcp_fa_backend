import express from "express";
import cors from "cors";

import testRoutes from "./routes/testRoutes.js";
import syncRoutes from "./routes/syncRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API is running",
  });
});

app.use("/api", testRoutes);
app.use("/api", syncRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/analytics", analyticsRoutes);
export default app;