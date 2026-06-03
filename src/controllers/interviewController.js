import Interview from "../models/Interview.js";
import Application from "../models/Application.js";
import mongoose from "mongoose";

const getQuery = (idParam) => {
  return mongoose.Types.ObjectId.isValid(idParam)
    ? { $or: [{ _id: idParam }, { interviewId: idParam }] }
    : { interviewId: idParam };
};

// GET ALL INTERVIEWS
export const getInterviews = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Interview.countDocuments();
    const interviews = await Interview.find()
      .populate({
        path: "application",
        populate: [
          { path: "student" },
          { path: "drive", populate: { path: "company" } }
        ]
      })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Interviews fetched successfully",
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: interviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET INTERVIEW BY ID
export const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findOne(getQuery(req.params.id)).populate({
      path: "application",
      populate: [
        { path: "student" },
        { path: "drive", populate: { path: "company" } }
      ]
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Interview fetched successfully",
      data: interview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE INTERVIEW
export const createInterview = async (req, res) => {
  try {
    const { application, interviewer, round, interviewDate } = req.body;

    // Check if application exists
    const appExists = await Application.findById(application);
    if (!appExists) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Validation Rule 1: Rejected applications cannot receive interviews
    if (appExists.status === "rejected") {
      return res.status(400).json({
        success: false,
        message: "Rejected application cannot receive interview",
      });
    }

    // Generate interview ID
    const interviewCount = await Interview.countDocuments();
    const interviewId = `INT${String(interviewCount + 1).padStart(3, "0")}`;

    const interview = await Interview.create({
      interviewId,
      application,
      interviewer,
      round,
      interviewDate,
    });

    res.status(201).json({
      success: true,
      message: "Interview created successfully",
      data: interview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE INTERVIEW
export const updateInterview = async (req, res) => {
  try {
    const { result, feedback, status } = req.body;

    // Validate result field
    if (result && !["pending", "pass", "fail"].includes(result)) {
      return res.status(400).json({
        success: false,
        message: "Invalid result. Must be one of: pending, pass, fail",
      });
    }

    const interview = await Interview.findOne(getQuery(req.params.id)).populate(
      "application"
    );

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    // Validation Rule 2: Selected candidates cannot be rescheduled
    if (
      interview.application.status === "selected" &&
      status === "scheduled"
    ) {
      return res.status(400).json({
        success: false,
        message: "Selected candidate cannot be rescheduled",
      });
    }

    const updatedInterview = await Interview.findOneAndUpdate(
      getQuery(req.params.id),
      { result, feedback, status },
      { new: true, runValidators: true }
    ).populate({
      path: "application",
      populate: [
        { path: "student" },
        { path: "drive", populate: { path: "company" } }
      ]
    });

    res.status(200).json({
      success: true,
      message: "Interview updated successfully",
      data: updatedInterview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE INTERVIEW
export const deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findOneAndDelete(getQuery(req.params.id));

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Interview deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
