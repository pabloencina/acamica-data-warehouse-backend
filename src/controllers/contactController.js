import {
  AlreadyInDbError,
  InvalidIdError,
  NotFoundError,
  ValidationFailedError,
} from "../errors/errors.js";
import {
  findAllContacts,
  findContactById,
  createContact,
  updateContactById,
  deleteContactById as serviceDelete,
} from "../services/contactService.js";

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
    console.log(request.params.contactId);
    let contactById = await findContactById(request.params.contactId);
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
    console.log(error);
    if (error instanceof AlreadyInDbError) {
      response.status(409).json({
        message: error.message,
        error: error.message,
      });
    } else if (error instanceof ValidationFailedError || error instanceof InvalidIdError) {
      response.status(400).json({
        message: error.message,
        error: error.errors,
      });
    } else if (error instanceof NotFoundError) {
      response.status(404).json({
        message: error.message,
        error: error.errors,
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
    const id = request.params.contactId;
    let contactUpdated = await updateContactById(id, body);
    response.status(200).json(contactUpdated);
  } catch (error) {
    if (error instanceof ValidationFailedError) {
      response.status(400).json({
        message: error.message,
        error: error.errors,
      });
    } else if (error instanceof NotFoundError) {
      response.status(404).json({
        message: error.message,
        error: error.message,
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
    const id = request.params.contactId;
    let contactDeleted = await serviceDelete(id);
    response.status(200).json(contactDeleted);
  } catch (error) {
    response.status(500).json({
      message: "Internal Server Error",
      error: "Internal Server Error",
    });
  }
};
