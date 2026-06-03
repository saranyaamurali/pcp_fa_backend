import Student from "../models/Student.js";

export const getHealth =
  async (req, res) => {
    try {
      const count =
        await Student.countDocuments();

      res.status(200).json({
        success: true,
        message: "Database connected successfully",
        data: {
          database: "connected",
          documentCount: count,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Database disconnected",
        data: {
          database: "disconnected",
        },
      });
    }
  };