import cityModel from "../models/cityModel";

export const findAllCities = async () => {
  try {
    const allCities = await cityModel.find();
    return allCities;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
