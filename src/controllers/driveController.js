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