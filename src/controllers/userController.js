import { InvalidIdError } from "../errors/errors.js";
import {
  findAllUser,
  updateUserById,
  findUserById,
  createUser,
  deleteUserById as serviceDelete,
} from "../services/userService.js";
import { formatValidationErrors } from "../utils/errorFormater.js";

export const getUsers = async (request, response) => {
  try {
    let users = await findAllUser();
    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({
      message: "Internal Server Error",
      error: "Internal Server Error",
    });
  }
};

export const getUserById = async (request, response) => {
  try {
    let userById = await findUserById(request.params.userId);
    response.status(200).json(userById);
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

export const postUser = async (request, response) => {
  try {
    const body = request.body;
    let userSaved = await createUser(body);
    response.status(201).json(userSaved);
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

export const putUserById = async (request, response) => {
  try {
    const body = request.body;
    const id = request.params.userId;
    let userUpdated = await updateUserById(id, body);
    response.status(200).json(userUpdated);
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

export const deleteUserById = async (request, response) => {
  try {
    const id = request.params.userId;
    let userDeleted = await serviceDelete(id);
    response.status(200).json(userDeleted);
  } catch (error) {
    response.status(500).json({
      message: "Internal Server Error",
      error: "Internal Server Error",
    });
  }
};
