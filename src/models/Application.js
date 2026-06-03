import mongoose from "mongoose";

const applicationSchema =
  new mongoose.Schema(
    {
      applicationId: {
        type: String,
        required: true,
        unique: true,
      },

      studentId: String,

      driveId: String,

      appliedAt: String,

      currentRound: String,

      status: String,
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Application",
  applicationSchema
);