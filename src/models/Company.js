import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    role: String,

    package: Number,

    eligibleDepartments: [String],

    minimumCgpa: Number,

    driveDate: String,

    status: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Company",
  companySchema
);