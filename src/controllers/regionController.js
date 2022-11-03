import { findAllRegions } from "../services/regionService";

export const getRegions = async (request, response) => {
  try {
    let regions = await findAllRegions();
    //Buscar todos los usuarios
    //En bucle recorrer todos los customers y agregarle el usuario que corresponde

    response.status(200).json(regions);
  } catch (error) {
    response.status(500).json({ error: "Try later..." });
  }
};
