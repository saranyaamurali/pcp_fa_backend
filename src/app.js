import express from "express";
import cors from "cors";

import testRoutes from "./routes/testRoutes.js";
import syncRoutes from "./routes/syncRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import driveRoutes from "./routes/driveRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Placement Recruitment API Running",
  });
});

app.use("/api", testRoutes);
app.use("/api", syncRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/students",studentRoutes);
app.use("/api/companies",companyRoutes);
app.use("/api/drives",driveRoutes);
app.use("/api/applications",applicationRoutes);
app.use("/api/interviews",interviewRoutes);
app.use("/api/auth",authRoutes);
export default app;