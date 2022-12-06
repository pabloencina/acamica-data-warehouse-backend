import {
  AlreadyInDbError,
  IntegrityError,
  InvalidIdError,
  NotFoundError,
  ValidationFailedError,
} from "../errors/errors.js";
import regionModel from "../models/regionModel.js";
import { formatValidationErrors } from "../utils/errorFormater.js";

import validator from "validator";

export const findAllRegions = async () => {
  try {
    const allRegions = await regionModel.find().populate({
      path: "countries",
      populate: {
        path: "cities",
      },
    });
    return allRegions;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findRegionById = async (id) => {
  if (validator.isMongoId(id)) {
    try {
      const regionById = await regionModel.findOne({ _id: id }).populate({
        path: "countries",
        populate: {
          path: "cities",
        },
      });
      return regionById;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    throw new InvalidIdError("The id is not valid");
  }
};

export const createRegion = async (region) => {
  try {
    const regionToSave = new regionModel(region);
    const savedRegion = await regionToSave.save();
    return savedRegion;
  } catch (error) {
    console.error(error);
    if (error.code && error.code === 11000) {
      throw new AlreadyInDbError(Object.keys(error.keyPattern)[0] + " is already in DB.");
    } else if (error._message && error._message === "Regions validation failed") {
      const errors = formatValidationErrors(error);
      throw new ValidationFailedError("Validation failed", errors);
    }
    throw error;
  }
};

export const updateRegionById = async (id, region) => {
  const { name } = region;
  try {
    const regionToUpdate = await regionModel.findOne({ _id: id });
    if (regionToUpdate) {
      await regionModel.updateOne({ _id: id }, { name }, { runValidators: true });
      return await regionModel.findOne({ _id: id });
    } else {
      throw new NotFoundError("region with id: " + id + " not found");
    }
  } catch (error) {
    console.error(error);
    if (error._message && error._message === "Validation failed") {
      const errors = formatValidationErrors(error);
      throw new ValidationFailedError("Validation failed", errors);
    }
    throw error;
  }
};

export const serviceDeleteRegionById = async (id) => {
  try {
    const deletedRegion = await regionModel.findOne({ _id: id });
    if (!deletedRegion) {
      throw new NotFoundError("Region " + id + " not found.");
    }
    if (deletedRegion.countries.length) {
      throw new IntegrityError(
        "Cannot delete region: " +
          id +
          ". Region has countries: " +
          deletedRegion.countries.map((c) => c._id)
      );
    }
    await regionModel.deleteOne({ _id: id });
    return deletedRegion;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
