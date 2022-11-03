import { InvalidIdError } from "../errors/invalidIdError";
import regionModel from "../models/regionModel";

const validator = require("validator");

export const findAllRegions = async () => {
  try {
    const allRegions = await regionModel.find();
    return allRegions;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
