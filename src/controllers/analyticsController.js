import Student from "../models/Student.js";

export const getAnalytics =
  async (req, res) => {
    try {
      const totalStudents =
        await Student.countDocuments();

      const activeStudents =
        await Student.countDocuments({
          status: "active",
        });

      const inactiveStudents =
        await Student.countDocuments({
          status: "inactive",
        });

      res.status(200).json({
        success: true,
        data: {
          totalStudents,
          activeStudents,
          inactiveStudents,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };