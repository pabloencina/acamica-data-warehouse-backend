import {
  AlreadyInDbError,
  InvalidIdError,
  NotFoundError,
  ValidationFailedError,
} from "../errors/errors.js";
import cityModel from "../models/cityModel.js";
import countryModel from "../models/countryModel.js";
import { formatValidationErrors } from "../utils/errorFormater.js";

import validator from "validator";

export const findAllCities = async () => {
  try {
    const allCities = await cityModel.find().populate("country");
    return allCities;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findCityById = async (id) => {
  if (validator.isMongoId(id)) {
    try {
      const cityById = await cityModel.findOne({ _id: id }).populate("country");
      return cityById;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    throw new InvalidIdError("The id is not valid");
  }
};

export const createCity = async (city) => {
  if (city.country && validator.isMongoId(city.country)) {
    try {
      const countryById = await countryModel.findOne({ _id: city.country });
      if (countryById) {
        const cityToSave = new cityModel(city);
        const savedCity = await cityToSave.save();
        await countryModel.updateOne(
          { _id: city.country },
          { cities: [...countryById.cities, savedCity._id] }
        );
        return savedCity;
      } else {
        throw new NotFoundError("Country not found.");
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
    throw new InvalidIdError("The id of country is not valid");
  }
};

export const updateCityById = async (id, city) => {
  const { name } = city;
  try {
    const cityToUpdate = await cityModel.findOne({ _id: id });
    if (cityToUpdate) {
      await cityModel.updateOne({ _id: id }, { name }, { runValidators: true });
      return await cityModel.findOne({ _id: id });
    } else {
      throw new NotFoundError("city with id: " + id + " not found");
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
