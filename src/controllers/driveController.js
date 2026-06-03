import Drive from "../models/Drive.js";

export const getDrives = async (
  req,
  res
) => {
  try {
    const drives =
      await Drive.find();

    res.status(200).json({
      success: true,
      message:
        "Drives fetched successfully",
      total: drives.length,
      data: drives,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

export const getDriveById =
  async (req, res) => {
    try {
      const drive =
        await Drive.findById(
          req.params.id
        );

      if (!drive) {
        return res.status(404).json({
          success: false,
          message:
            "Drive not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Drive fetched successfully",
        data: drive,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

export const createDrive =
  async (req, res) => {
    try {
      const drive =
        await Drive.create(
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "Drive created successfully",
        data: drive,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

export const updateDrive =
  async (req, res) => {
    try {
      const drive =
        await Drive.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!drive) {
        return res.status(404).json({
          success: false,
          message:
            "Drive not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Drive updated successfully",
        data: drive,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

export const deleteDrive =
  async (req, res) => {
    try {
      const drive =
        await Drive.findByIdAndDelete(
          req.params.id
        );

      if (!drive) {
        return res.status(404).json({
          success: false,
          message:
            "Drive not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Drive deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };