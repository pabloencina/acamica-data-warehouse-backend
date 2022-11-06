import { findAllCountries } from "../services/countryService";

export const getCountries = async (request, response) => {
  try {
    let countries = await findAllCountries();
    response.status(200).json(countries);
  } catch (error) {
    response.status(500).json({ error: "Try later..." });
  }
};
