import express from "express";

import {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.js";

const router = express.Router();

router.post("/", createCompany);

router.get("/", getCompanies);

router.get("/:id", getCompanyById);

router.patch("/:id", updateCompany);

router.delete("/:id", deleteCompany);

export default router;