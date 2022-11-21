import {
  AlreadyInDbError,
  InvalidIdError,
  NotFoundError,
  ValidationFailedError,
} from "../errors/errors.js";
import countryModel from "../models/countryModel.js";
import regionModel from "../models/regionModel.js";
import { formatValidationErrors } from "../utils/errorFormater.js";

import validator from "validator";

export const findAllCountries = async () => {
  try {
    const allCountries = await countryModel.find().populate("cities").populate("region");
    return allCountries;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findCountryById = async (id) => {
  if (validator.isMongoId(id)) {
    try {
      const countryById = await countryModel
        .findOne({ _id: id })
        .populate("cities")
        .populate("region");
      return countryById;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    throw new InvalidIdError("The id is not valid");
  }
};

export const createCountry = async (country) => {
  if (validator.isMongoId(country.region)) {
    try {
      const regionById = await regionModel.findOne({ _id: country.region });
      if (regionById) {
        const countryToSave = new countryModel(country);
        const savedCountry = await countryToSave.save();
        await regionModel.updateOne(
          { _id: country.region },
          { countries: [...regionById.countries, savedCountry._id] }
        );
        return savedCountry;
      } else {
        throw new NotFoundError("Region not found.");
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
    throw new InvalidIdError("The id of region is not valid");
  }
};

export const updateCountryById = async (id, country) => {
  const { name } = country;
  try {
    const countryToUpdate = await countryModel.findOne({ _id: id });
    if (countryToUpdate) {
      await countryModel.updateOne({ _id: id }, { name }, { runValidators: true });
      return await countryModel.findOne({ _id: id });
    } else {
      throw new NotFoundError("country with id: " + id + " not found");
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
