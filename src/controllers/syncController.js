import Student from "../models/Student.js";
import Company from "../models/Company.js";
import Drive from "../models/Drive.js";
import Application from "../models/Application.js";

import { fetchPlacementData } from "../services/dataService.js";

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

export const syncData = async (req, res) => {
  try {
    const response =
      await fetchPlacementData();

    const data = response.data;

    let inserted = 0;
    let duplicates = 0;
    let rejected = 0;

    // =====================
    // STUDENTS
    // =====================

    for (const student of data.students) {
      if (!validateStudent(student)) {
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

    // =====================
    // COMPANIES
    // =====================

    for (const company of data.companies) {
      if (!validateCompany(company)) {
        rejected++;
        continue;
      }

      const cleanCompany =
        sanitizeCompany(company);

      const exists =
        await Company.findOne({
          companyId:
            cleanCompany.companyId,
        });

      if (exists) {
        duplicates++;
        continue;
      }

      await Company.create(
        cleanCompany
      );

      inserted++;
    }

    // =====================
    // DRIVES
    // =====================

    for (const drive of data.drives) {
      if (!validateDrive(drive)) {
        rejected++;
        continue;
      }

      const cleanDrive =
        sanitizeDrive(drive);

      const exists =
        await Drive.findOne({
          driveId:
            cleanDrive.driveId,
        });

      if (exists) {
        duplicates++;
        continue;
      }

      await Drive.create(
        cleanDrive
      );

      inserted++;
    }

    // =====================
    // APPLICATIONS
    // =====================

    for (const application of data.applications) {
      if (
        !validateApplication(
          application
        )
      ) {
        rejected++;
        continue;
      }

      const cleanApplication =
        sanitizeApplication(
          application
        );

      const exists =
        await Application.findOne({
          applicationId:
            cleanApplication.applicationId,
        });

      if (exists) {
        duplicates++;
        continue;
      }

      await Application.create(
        cleanApplication
      );

      inserted++;
    }

    res.status(200).json({
      success: true,
      message:
        "Dataset synchronized successfully",
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