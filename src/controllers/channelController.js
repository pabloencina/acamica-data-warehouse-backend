import { findChannels } from "../services/channelService";

export const getChannels = async (request, response) => {
  try {
    let channels = await findChannels();
    //Buscar todos los usuarios
    //En bucle recorrer todos los customers y agregarle el usuario que corresponde

    response.status(200).json(channels);
  } catch (error) {
    response.status(500).json({ error: "Try later..." });
  }
};
