import mongoose from "mongoose";

const driveSchema = new mongoose.Schema(
  {
    driveId: {
      type: String,
      unique: true,
      required: true,
    },
    companyId: String,
    title: String,
    mode: String,
    location: String,
    registrationDeadline: String,
    rounds: [String],
    status: String,
  },
  { timestamps: true }
);

export default mongoose.model(
  "Drive",
  driveSchema
);