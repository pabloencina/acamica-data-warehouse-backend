import { InvalidIdError } from "../errors/invalidIdError";
import {
  findAllUser,
  updateUser,
  findUserById,
  createUser,
} from "../services/userService";
import { formatValidationErrors } from "../utils/errorFormater";

export const getUsers = async (request, response) => {
  try {
    let users = await findAllUser();
    //Buscar todos los usuarios
    //En bucle recorrer todos los customers y agregarle el usuario que corresponde

    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ error: "Try later..." });
  }
};

export const getUserById = async (request, response) => {
  try {
    
    let userById = await  findUserById(request.params.userId);
    console.log(userById);
    response.status(200).json(userById);

  } catch (error) {
    if(error instanceof InvalidIdError){
      response.status(406).json({ error: error.message });
    }
    response.status(500).json({ error: "Try later..." });
  }
};

export const postUser = async (request, response) => {
  try {
    const body = request.body;

    let userSaved = await updateUser(body);

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
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const putUsers = async (request, response) => {
  try {
    const body = request.body;

    let userUpdated = await createUser(body);

    response.status(201).json(userUpdated);
    console.log(userUpdated);
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
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
};
