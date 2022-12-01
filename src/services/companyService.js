import {
  AlreadyInDbError,
  InvalidIdError,
  NotFoundError,
  ValidationFailedError,
} from "../errors/errors.js";
import cityModel from "../models/cityModel.js";
import companyModel from "../models/companyModel.js";
import { formatValidationErrors } from "../utils/errorFormater.js";

import validator from "validator";

export const findAllCompanies = async () => {
  try {
    const allCompanies = await companyModel.find().populate("city");
    return allCompanies;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findCompanyById = async (id) => {
  if (validator.isMongoId(id)) {
    try {
      const countryById = await companyModel.findOne({ _id: id }).populate({
        path: "city",
        populate: {
          path: "country",
          populate: {
            path: "region",
          },
        },
      });
      return countryById;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    throw new InvalidIdError("The id is not valid");
  }
};

export const createCompany = async (company) => {
  if (validator.isMongoId(company.city)) {
    try {
      const cityById = await cityModel.findOne({ _id: company.city });
      if (cityById) {
        const companyToSave = new companyModel(company);
        const savedCompany = await companyToSave.save();
        return savedCompany;
      } else {
        throw new NotFoundError("City not found.");
      }
    } catch (error) {
      console.error(error);
      if (error.code && error.code === 11000) {
        throw new AlreadyInDbError(Object.keys(error.keyPattern)[0] + " is already in DB.");
      } else if (error._message && error._message === "Countries validation failed") {
        const errors = formatValidationErrors(error);
        throw new ValidationFailedError("Validation failed", errors);
      }
      throw error;
    }
  } else {
    throw new InvalidIdError("The id of city is not valid");
  }
};

export const updateCompanyById = async (id, company) => {
  const { name, email, phone, address } = company;
  try {
    const companyToUpdate = await companyModel.findOne({ _id: id });
    if (companyToUpdate) {
      let cityById = undefined;
      if (company.city) {
        cityById = await cityModel.findOne({ _id: company.city });
        if (!cityById) {
          throw new NotFoundError("City not found.");
        }
      }
      await companyModel.updateOne(
        { _id: id },
        { name, email, phone, address, city: cityById?._id || undefined },
        { runValidators: true }
      );
      return await companyModel.findOne({ _id: id });
    } else {
      throw new NotFoundError("company with id: " + id + " not found");
    }
  } catch (error) {
    console.error(error);
    if (error.code && error.code === 11000) {
      throw new AlreadyInDbError(Object.keys(error.keyPattern)[0] + " is already in DB.");
    } else if (error._message && error._message === "Validation failed") {
      const errors = formatValidationErrors(error);
      throw new ValidationFailedError("Validation failed", errors);
    }
    throw error;
  }
};

export const deleteCompanyById = async (id) => {
  try {
    const deletedCompany = await companyModel.findOne({ _id: id });
    await companyModel.deleteOne({ _id: id });
    return deletedCompany;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
