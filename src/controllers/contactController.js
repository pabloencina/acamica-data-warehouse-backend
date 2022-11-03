import { findAllContacts } from "../services/contactService";

export const getContacts = async (request, response) => {
  try {
    let contacts = await findAllContacts();
    //Buscar todos los usuarios
    //En bucle recorrer todos los customers y agregarle el usuario que corresponde

    response.status(200).json(contacts);
  } catch (error) {
    response.status(500).json({ error: "Try later..." });
  }
};
