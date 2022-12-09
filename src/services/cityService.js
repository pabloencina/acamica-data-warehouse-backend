import {
  AlreadyInDbError,
  IntegrityError,
  InvalidIdError,
  NotFoundError,
  ValidationFailedError,
} from "../errors/errors.js";
import cityModel from "../models/cityModel.js";
import countryModel from "../models/countryModel.js";
import companyModel from "../models/companyModel.js";
import contactModel from "../models/contactModel.js";
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

export const serviceDeleteCityById = async (id) => {
  try {
    const deletedCity = await cityModel.findOne({ _id: id });
    if (!deletedCity) {
      throw new NotFoundError("City " + id + " not found.");
    }
    const contactsByCity = await contactModel.find({ city: id });
    if (contactsByCity.length) {
      throw new IntegrityError(
        "Cannot delete city: " +
          id +
          ". City refers to contacts: " +
          contactsByCity.map((c) => c._id)
      );
    }
    const companiesByCity = await companyModel.find({ city: id });
    if (companiesByCity.length) {
      throw new IntegrityError(
        "Cannot delete city: " +
          id +
          ". City refers to companies: " +
          companiesByCity.map((c) => c._id)
      );
    }

    const country = await countryModel.findOne({ _id: deletedCity.country });
    const countryCities = country.cities.filter((c) => !c._id.equals(id));
    await countryModel.updateOne({ _id: deletedCity.country }, { cities: countryCities });

    await cityModel.deleteOne({ _id: id });
    return deletedCity;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
