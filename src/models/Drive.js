import mongoose from "mongoose";

const driveSchema = new mongoose.Schema(
  {
    driveId: {
      type: String,
      required: true,
      unique: true,
    },

    companyId: String,

    title: String,

    mode: String,

    location: String,

    registrationDeadline: String,

    rounds: [String],

    status: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Drive",
  driveSchema
);