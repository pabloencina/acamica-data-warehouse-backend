import { InvalidIdError } from "../errors/invalidIdError";
import regionModel from "../models/regionModel";

const validator = require("validator");

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
    throw error;
  }
};

export const updateRegionById = async (id, region) => {
  const { name } = region;
  try {
    await regionModel.updateOne(
      { _id: id },
      { name }
    );
    return await regionModel.findOne({ _id: id });
  } catch (error) {
    console.error(error);
    throw error;
  }
};