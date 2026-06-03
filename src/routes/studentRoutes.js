import express from "express";

import {
  getStudents,
  getStudentById,
  searchStudents,
  filterStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

// CREATE
router.post("/", createStudent);

// READ
router.get("/", getStudents);
router.get("/search", searchStudents);
router.get("/filter", filterStudents);
router.get("/:id", getStudentById);

// UPDATE
router.put("/:id", updateStudent);

// DELETE
router.delete("/:id", deleteStudent);

export default router;