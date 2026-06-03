import Drive from "../models/Drive.js";
import Company from "../models/Company.js";

export const getDrives = async (
  req,
  res
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.company) {
      // Find companies matching name
      const companies = await Company.find({
        name: { $regex: req.query.company, $options: "i" }
      });
      const companyIds = companies.map(c => c._id);
      filter.company = { $in: companyIds };
    }

    const total =
      await Drive.countDocuments(filter);

    const drives =
      await Drive.find(filter)
        .populate("company")
        .skip(skip)
        .limit(limit);

    res.status(200).json({
      success: true,
      message:
        "Drives fetched successfully",
      page,
      limit,
      total,
      totalPages: Math.ceil(
        total / limit
      ),
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
        ).populate("company");

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