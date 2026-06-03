import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    interviewId: {
      type: String,
      unique: true,
      required: true,
    },
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
    interviewer: {
      type: String,
      required: true,
    },
    round: {
      type: String,
      required: true,
    },
    interviewDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
    result: {
      type: String,
      enum: ["pending", "pass", "fail"],
      default: "pending",
    },
    feedback: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Interview", interviewSchema);
