import Student from "../models/Student.js";
import mongoose from "mongoose";

const getQuery = (idParam) => {
  return mongoose.Types.ObjectId.isValid(idParam)
    ? { $or: [{ _id: idParam }, { studentId: idParam }] }
    : { studentId: idParam };
};

// GET ALL STUDENTS + PAGINATION
export const getStudents = async (
  req,
  res
) => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const { department, cgpaMin, status } = req.query;
    let query = {};

    if (department) {
      query.department = department;
    }

    if (cgpaMin) {
      query.cgpa = { $gte: Number(cgpaMin) };
    }

    if (status) {
      query.status = status;
    }

    const total =
      await Student.countDocuments(query);

    const students =
      await Student.find(query)
        .skip(skip)
        .limit(limit);

    res.status(200).json({
      success: true,
      message:
        "Students fetched successfully",
      page,
      limit,
      total,
      totalPages:
        Math.ceil(
          total / limit
        ),
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

// GET STUDENT BY ID
export const getStudentById =
  async (req, res) => {
    try {
      const student = await Student.findOne(getQuery(req.params.id));

      if (!student) {
        return res.status(404).json({
          success: false,
          message:
            "Student not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Student fetched successfully",
        data: student,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// SEARCH STUDENTS
export const searchStudents =
  async (req, res) => {
    try {
      const { q } = req.query;

      const students =
        await Student.find({
          name: {
            $regex: q,
            $options: "i",
          },
        });

      res.status(200).json({
        success: true,
        message:
          "Students fetched successfully",
        count:
          students.length,
        data: students,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// FILTER STUDENTS
export const filterStudents =
  async (req, res) => {
    try {
      const {
        department,
        status,
      } = req.query;

      let filter = {};

      if (department) {
        filter.department =
          department;
      }

      if (status) {
        filter.status =
          status;
      }

      const students =
        await Student.find(
          filter
        );

      res.status(200).json({
        success: true,
        message:
          "Students filtered successfully",
        count:
          students.length,
        data: students,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// CREATE STUDENT
export const createStudent =
  async (req, res) => {
    try {
      const student =
        await Student.create(
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "Student created successfully",
        data: student,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// UPDATE STUDENT
export const updateStudent =
  async (req, res) => {
    try {
      const student = await Student.findOneAndUpdate(
        getQuery(req.params.id),
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!student) {
        return res.status(404).json({
          success: false,
          message:
            "Student not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Student updated successfully",
        data: student,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// DELETE STUDENT
export const deleteStudent =
  async (req, res) => {
    try {
      const student = await Student.findOneAndDelete(getQuery(req.params.id));

      if (!student) {
        return res.status(404).json({
          success: false,
          message:
            "Student not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Student deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };