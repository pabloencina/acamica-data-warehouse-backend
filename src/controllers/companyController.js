import { findAllCompanies } from "../services/companyService";

export const getCompanies = async (request, response) => {
  try {
    let companies = await findAllCompanies();
    //Buscar todos los usuarios
    //En bucle recorrer todos los customers y agregarle el usuario que corresponde

    response.status(200).json(companies);
  } catch (error) {
    response.status(500).json({ error: "Try later..." });
  }
};
