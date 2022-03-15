import { findAllUser } from "../services/userService";
import { createUser } from "../services/userService";

//import { InvalidIdError, InvalidObjectError, NotFoundError } from "../error.js";

/*import {
    findAllAdministratorsDB,
    saveAdministratorDB,
    findAdministratorByIdDB
} from "../repositories/administratorRepository.js";*/

//import { validateId } from "./idValidator.js";

//import { saveUserDB } from "../repositories/userRepository.js";

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

export const postUser = async (request, response) => {
  try {
    const body = request.body;

    let userSaved = await createUser(body);

    response.status(201).json(userSaved);

    response.status(200).json();
  } catch (error) {
    // console.log(error);

    // if (error.code && error.code === 11000) {
    //   response
    //     .status(409)
    //     .json({
    //       error: Object.keys(error.keyPattern)[0] + " is already in DB.",
    //     });
    // } else if(error._message && error._message === "Users validation failed"){
    //   response
    //     .status(400)
    //     .json({
    //       errors: error.errors,
    //     });
    // }
    // else {
      response.status(500).json({ error: "Internal Server Error" });
    // }

  }
};
