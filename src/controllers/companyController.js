import Company from "../models/Company.js";
import mongoose from "mongoose";

const getQuery = (idParam) => {
  return mongoose.Types.ObjectId.isValid(idParam)
    ? { $or: [{ _id: idParam }, { companyId: idParam }] }
    : { companyId: idParam };
};

export const getCompanies = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Company.countDocuments();
    const companies = await Company.find()
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Companies fetched successfully",
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: companies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findOne(getQuery(req.params.id));

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company fetched successfully",
      data: company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createCompany = async (
  req,
  res
) => {
  try {
    const company =
      await Company.create(req.body);

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCompany = async (
  req,
  res
) => {
  try {
    const company = await Company.findOneAndUpdate(
      getQuery(req.params.id),
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      data: company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCompany = async (
  req,
  res
) => {
  try {
    const company = await Company.findOneAndDelete(getQuery(req.params.id));

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};