import Student from "../models/Student.js";
import Company from "../models/Company.js";
import Application from "../models/Application.js";
import Drive from "../models/Drive.js";

export const getStudentAnalytics = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const activeStudents = await Student.countDocuments({ status: "active" });
    const inactiveStudents = await Student.countDocuments({ status: "inactive" });

    res.status(200).json({
      success: true,
      message: "Student analytics fetched successfully",
      data: {
        totalStudents,
        activeStudents,
        inactiveStudents,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCompanyAnalytics = async (req, res) => {
  try {
    const companies = await Company.find();
    const data = [];

    for (const company of companies) {
      const drives = await Drive.find({ company: company._id });
      const driveIds = drives.map(d => d._id);

      const applications = await Application.find({ drive: { $in: driveIds } });
      const participationCount = applications.length;
      const selectedStudents = applications.filter(app => app.status === "selected").length;

      data.push({
        _id: company._id,
        companyName: company.name,
        highestPackage: company.package || 0,
        participationCount,
        selectedStudents,
      });
    }

    res.status(200).json({
      success: true,
      message: "Company analytics fetched",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getApplicationAnalytics = async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();
    const selected = await Application.countDocuments({ status: "selected" });
    const rejected = await Application.countDocuments({ status: "rejected" });

    res.status(200).json({
      success: true,
      message: "Application analytics fetched successfully",
      data: {
        totalApplications,
        selected,
        rejected,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDepartmentAnalytics = async (req, res) => {
  try {
    const students = await Student.find();
    const deptMap = {};

    students.forEach(student => {
      const dept = student.department;
      if (!deptMap[dept]) {
        deptMap[dept] = { total: 0, placed: new Set() };
      }
      deptMap[dept].total++;
    });

    const selectedApps = await Application.find({ status: "selected" }).populate("student");
    selectedApps.forEach(app => {
      if (app.student) {
        const dept = app.student.department;
        if (deptMap[dept]) {
          deptMap[dept].placed.add(app.student._id.toString());
        }
      }
    });

    const data = Object.keys(deptMap).map(dept => {
      const total = deptMap[dept].total;
      const placedCount = deptMap[dept].placed.size;
      const placementPercentage = total > 0 ? ((placedCount / total) * 100).toFixed(2) : "0.00";
      return {
        department: dept,
        placedCount,
        placementPercentage,
      };
    });

    res.status(200).json({
      success: true,
      message: "Department analytics fetched",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPlacementAnalytics = async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();
    const shortlistedCount = await Application.countDocuments({ status: "shortlisted" });
    const selectedCount = await Application.countDocuments({ status: "selected" });
    const rejectedCount = await Application.countDocuments({ status: "rejected" });

    res.status(200).json({
      success: true,
      message: "Placement analytics fetched",
      data: {
        totalApplications,
        shortlistedCount,
        selectedCount,
        rejectedCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};