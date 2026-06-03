import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      unique: true,
      required: true,
    },
    name: String,
    email: String,
    department: String,
    cgpa: Number,
    skills: [String],
    graduationYear: Number,
    phone: String,
    status: String,
  },
  { timestamps: true }
);

export default mongoose.model(
  "Student",
  studentSchema
);