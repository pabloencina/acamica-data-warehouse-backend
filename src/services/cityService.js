import { InvalidIdError } from "../errors/invalidIdError";
import cityModel from "../models/cityModel";

const validator = require("validator");

export const findAllCities = async () => {
  try {
    const allCities = await cityModel.find();
    return allCities;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
