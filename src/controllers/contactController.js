import { InvalidIdError } from "../errors/errors.js";
import {
  findAllContacts,
  findContactById,
  createContact,
  updateContactById,
  deleteContactById as serviceDelete,
} from "../services/contactService.js";
import { formatValidationErrors } from "../utils/errorFormater.js";

export const getContacts = async (request, response) => {
  try {
    let contacts = await findAllContacts();
    response.status(200).json(contacts);
  } catch (error) {
    response.status(500).json({
      message: "Internal Server Error",
      error: "Internal Server Error",
    });
  }
};

export const getContactById = async (request, response) => {
  try {
    let contactById = await findContactById(request.params.userId);
    response.status(200).json(contactById);
  } catch (error) {
    if (error instanceof InvalidIdError) {
      response.status(400).json({ error: error.message });
    } else {
      response.status(500).json({
        message: "Internal Server Error",
        error: "Internal Server Error",
      });
    }
  }
};

export const postContact = async (request, response) => {
  try {
    const body = request.body;
    let contactSaved = await createContact(body);
    response.status(201).json(contactSaved);
  } catch (error) {
    if (error.code && error.code === 11000) {
      response.status(409).json({
        error: Object.keys(error.keyPattern)[0] + " is already in DB.",
      });
    } else if (error._message && error._message === "Users validation failed") {
      response.status(400).json({
        errors: formatValidationErrors(error),
      });
    } else {
      response.status(500).json({
        message: "Internal Server Error",
        error: "Internal Server Error",
      });
    }
  }
};

export const putContactById = async (request, response) => {
  try {
    const body = request.body;
    const id = request.params.userId;
    let contactUpdated = await updateContactById(id, body);
    response.status(200).json(contactUpdated);
  } catch (error) {
    if (error._message && error._message === "Validation failed") {
      response.status(400).json({
        errors: formatValidationErrors(error),
      });
    } else {
      response.status(500).json({
        message: "Internal Server Error",
        error: "Internal Server Error",
      });
    }
  }
};

export const deleteContactById = async (request, response) => {
  try {
    const id = request.params.userId;
    let contactDeleted = await serviceDelete(id);
    response.status(200).json(contactDeleted);
  } catch (error) {
    response.status(500).json({
      message: "Internal Server Error",
      error: "Internal Server Error",
    });
  }
};
