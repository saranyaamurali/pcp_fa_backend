import Student from "../models/Student.js";
import Company from "../models/Company.js";
import Application from "../models/Application.js";

export const getStudentAnalytics =
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
        message:
          "Student analytics fetched successfully",
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

export const getCompanyAnalytics =
  async (req, res) => {
    try {
      const totalCompanies =
        await Company.countDocuments();

      const activeCompanies =
        await Company.countDocuments({
          status: "active",
        });

      res.status(200).json({
        success: true,
        message:
          "Company analytics fetched successfully",
        data: {
          totalCompanies,
          activeCompanies,
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

export const getApplicationAnalytics =
  async (req, res) => {
    try {
      const totalApplications =
        await Application.countDocuments();

      const selected =
        await Application.countDocuments({
          status: "selected",
        });

      const rejected =
        await Application.countDocuments({
          status: "rejected",
        });

      res.status(200).json({
        success: true,
        message:
          "Application analytics fetched successfully",
        data: {
          totalApplications,
          selected,
          rejected,
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

export const getDepartmentAnalytics =
  async (req, res) => {
    try {
      const departments =
        await Student.aggregate([
          {
            $group: {
              _id: "$department",
              count: {
                $sum: 1,
              },
            },
          },
        ]);

      res.status(200).json({
        success: true,
        message:
          "Department analytics fetched successfully",
        data: departments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

export const getPlacementAnalytics =
  async (req, res) => {
    try {
      const totalApplications =
        await Application.countDocuments();

      const selected =
        await Application.countDocuments({
          status: "selected",
        });

      const rejected =
        await Application.countDocuments({
          status: "rejected",
        });

      const pending =
        await Application.countDocuments({
          status: "pending",
        });

      res.status(200).json({
        success: true,
        message:
          "Placement analytics fetched successfully",
        data: {
          totalApplications,
          selected,
          rejected,
          pending,
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