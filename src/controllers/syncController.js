import Student from "../models/Student.js";
import Company from "../models/Company.js";
import Drive from "../models/Drive.js";
import Application from "../models/Application.js";

import { fetchPlacementData }
from "../services/dataService.js";

import {
  validateStudent,
  validateCompany,
  validateDrive,
  validateApplication,
} from "../utils/validator.js";

import {
  sanitizeStudent,
  sanitizeCompany,
  sanitizeDrive,
  sanitizeApplication,
} from "../utils/sanitizer.js";

export const syncData =
async (req, res) => {
  try {
    const response =
      await fetchPlacementData();

    const data = response.data;

    let inserted = 0;
    let duplicates = 0;
    let rejected = 0;

    for (const student of data.students) {
      if (
        !validateStudent(student)
      ) {
        rejected++;
        continue;
      }

      const cleanStudent =
        sanitizeStudent(student);

      const exists =
        await Student.findOne({
          studentId:
            cleanStudent.studentId,
        });

      if (exists) {
        duplicates++;
        continue;
      }

      await Student.create(
        cleanStudent
      );

      inserted++;
    }

    res.status(200).json({
      success: true,
      inserted,
      duplicates,
      rejected,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};