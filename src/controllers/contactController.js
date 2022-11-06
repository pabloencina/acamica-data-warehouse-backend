import { findAllContacts } from "../services/contactService";

export const getContacts = async (request, response) => {
  try {
    let contacts = await findAllContacts();
    response.status(200).json(contacts);
  } catch (error) {
    response.status(500).json({ error: "Try later..." });
  }
};
