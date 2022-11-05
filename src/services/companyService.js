import { InvalidIdError } from "../errors/invalidIdError";
import companyModel from "../models/companyModel";

const validator = require("validator");

export const findAllCompanies = async () => {
  try {
    const allCompanies = await companyModel.find();
    return allCompanies;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
