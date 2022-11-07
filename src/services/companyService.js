import companyModel from "../models/companyModel";

export const findAllCompanies = async () => {
  try {
    const allCompanies = await companyModel.find();
    return allCompanies;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
