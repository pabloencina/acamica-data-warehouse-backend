import { InvalidIdError } from "../errors/invalidIdError";
import countryModel from "../models/countryModel";

const validator = require("validator");

export const findAllCountries = async () => {
  try {
    const allCountries = await countryModel.find().populate("cities");
    console.log(allCountries);
    return allCountries;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
