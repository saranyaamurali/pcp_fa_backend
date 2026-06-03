import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import Student from "../models/Student.js";

export const register = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    if (
      role !== "admin" &&
      role !==
        "placement_officer"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Only admin and placement officer can register",
      });
    }

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "Email already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
        role,
      });

    res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
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

export const login = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    // Admin / Placement Officer
    const user =
      await User.findOne({
        email,
      });

    if (user) {
      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (isMatch) {
        const token =
          jwt.sign(
            {
              id: user._id,
              email:
                user.email,
              role:
                user.role,
            },
            "secretkey",
            {
              expiresIn:
                "1d",
            }
          );

        return res
          .status(200)
          .json({
            success: true,
            token,
          });
      }
    }

    // Student Login
    const student =
      await Student.findOne({
        email,
      });

    if (
      student &&
      password ===
        student.studentId
    ) {
      const token =
        jwt.sign(
          {
            id: student._id,
            email:
              student.email,
            role:
              "student",
            studentId:
              student.studentId,
          },
          "secretkey",
          {
            expiresIn:
              "1d",
          }
        );

      return res
        .status(200)
        .json({
          success: true,
          token,
        });
    }

    return res.status(401).json({
      success: false,
      message:
        "Invalid credentials",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

export const me = async (
  req,
  res
) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};