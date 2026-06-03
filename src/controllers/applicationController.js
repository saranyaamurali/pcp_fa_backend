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
        total:
          applications.length,
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
        message:
          "Application fetched successfully",
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

export const createApplication =
  async (req, res) => {
    try {
      const application =
        await Application.create(
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "Application created successfully",
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

export const updateApplication =
  async (req, res) => {
    try {
      const application =
        await Application.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
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
        message:
          "Application updated successfully",
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

export const deleteApplication =
  async (req, res) => {
    try {
      const application =
        await Application.findByIdAndDelete(
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
        message:
          "Application deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };