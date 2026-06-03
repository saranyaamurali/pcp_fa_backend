import Application from "../models/Application.js";
import Student from "../models/Student.js";
import Company from "../models/Company.js";
import Drive from "../models/Drive.js";

export const getApplications =
  async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      let filter = {};
      if (req.query.status) {
        filter.status = req.query.status;
      }

      if (req.query.search) {
        const searchRegex = { $regex: req.query.search, $options: "i" };
        const matchingStudents = await Student.find({ name: searchRegex });
        const studentIds = matchingStudents.map(s => s._id);

        const matchingCompanies = await Company.find({ name: searchRegex });
        const companyIds = matchingCompanies.map(c => c._id);

        const matchingDrives = await Drive.find({ company: { $in: companyIds } });
        const driveIds = matchingDrives.map(d => d._id);

        filter.$or = [
          { student: { $in: studentIds } },
          { drive: { $in: driveIds } }
        ];
      }

      const total =
        await Application.countDocuments(filter);

      const applications =
        await Application.find(filter)
          .populate({
            path: "student",
            select: "studentId name email department cgpa skills graduationYear phone status",
          })
          .populate({
            path: "drive",
            populate: {
              path: "company",
              select: "companyId name role package eligibleDepartments minimumCgpa driveDate status",
            },
          })
          .skip(skip)
          .limit(limit);

      res.status(200).json({
        success: true,
        message:
          "Applications fetched successfully",
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
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
        )
          .populate({
            path: "student",
            select: "studentId name email department cgpa skills graduationYear phone status",
          })
          .populate({
            path: "drive",
            populate: {
              path: "company",
              select: "companyId name role package eligibleDepartments minimumCgpa driveDate status",
            },
          });

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