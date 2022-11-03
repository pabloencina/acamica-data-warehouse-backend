import { findAllCountries } from "../services/countryService";

export const getCountries = async (request, response) => {
  try {
    let countries = await findAllCountries();
    //Buscar todos los usuarios
    //En bucle recorrer todos los customers y agregarle el usuario que corresponde

    response.status(200).json(countries);
  } catch (error) {
    response.status(500).json({ error: "Try later..." });
  }
};
