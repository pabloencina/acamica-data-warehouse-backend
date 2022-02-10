// import { InvalidIdError, NotFoundError } from "../error.js"
import jsonwebtoken from "jsonwebtoken";
//import { findUserByEmailAndPasswordDB } from "../repositories/userRepository.js"
//import { findAdministratorByUserIdDB } from "../repositories/administratorRepository.js";
//import { findCustomerByUserIdDB } from "../repositories/customerRepository.js";

export const postLogin = async (request, response) => {
console.log(request)
  try {
    const email = request.body.email;
    const password = request.body.password;
    console.log(email);
    console.log(password);
    const secretJWT = "ponerAlgoSuperComplicadoConNumuerosYCaracteres1234";

    const userRecovered = {
        email: email,
        password: password
    }
    
    const token = jsonwebtoken.sign(userRecovered, secretJWT, {
      expiresIn: "120m",
    });

    response.status(200).json(token);
  } catch (error) {
    response.status(500).json({ error: error.message });
    /*
        if (error instanceof InvalidIdError) {
            response.status(400).json({ error: error.message });
        } else if (error instanceof NotFoundError) {
            response.status(404).json({ error: error.message })
        } else {
            response.status(500).json({ error: error.message });
        }
        */
  }
};
