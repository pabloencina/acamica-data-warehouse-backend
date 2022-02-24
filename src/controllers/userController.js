import { usersSchema } from "../models/userModel";

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
    let users = [
      {
        userId: 1,
        name: "string",
        surname: "string",
        email: "string",
        profile: "ADMIN",
        phone: "string",
        password: "string",
      },
    ];
    //Buscar todos los usuarios
    //En bucle recorrer todos los customers y agregarle el usuario que corresponde
    response.status(200).json(users);
    console.log(users);
  } catch (error) {
    response.status(500).json({ error: "Try later..." });
  }
};

/*
export const getAdministratorById = async (request, response) => {

    try {

        const administratorID = validateId(request.params.administratorId)
        //console.log(adminstratorId)
        const administratorByIdDB = await findAdministratorByIdDB(administratorID)

        if (administratorByIdDB === null) {
            throw new NotFoundError("Can't find administrator.administratorId = " + administratorID)
        }

        response.status(200).json(administratorByIdDB);

    } catch (error) {

        response.status(500).json({ error: "Try later..." })

    }

}


export const postAdministrators = async (request, response) => {

    try {

        const body = request.body;
        const userBody = request.body.user;

        User.validate(userBody);

        const user = new User(null, userBody.name, userBody.surname, userBody.email, userBody.phone, userBody.password, true);

        let userSaved = await saveUserDB(user);

        Administrator.validate(body);

        const administrator = new Administrator(null, body.identificationNumber, userSaved);

        let administratorSaved = await saveAdministratorDB(administrator);

        response.status(201).json(administratorSaved);

    } catch (error) {

        if (error instanceof InvalidIdError) {

            response.status(400).json({ error: error.message });

        } else if (error instanceof InvalidObjectError) {

            response.status(400).json({ error: error.message });

        } else {

            response.status(500).json({ error: error.message });
        }

    }

}
*/
