import Application from "../models/Application.js";

export const getApplications =
  async (req, res) => {
    try {
      const applications =
        await Application.find();

      res.status(200).json({
        success: true,
        message:
          "Applications fetched successfully",
        data: applications,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

export const getApplicationById =
  async (req, res) => {
    try {
      const application =
        await Application.findById(
          req.params.id
        );

      if (!application) {
        return res.status(404).json({
          success: false,
          message:
            "Application not found",
        });
      }

      res.status(200).json({
        success: true,
        data: application,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };