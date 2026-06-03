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
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },

      driveId: String,
      drive: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drive",
      },

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