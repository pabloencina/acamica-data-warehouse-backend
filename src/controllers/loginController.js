// import { InvalidIdError, NotFoundError } from "../error.js"
import jsonwebtoken from "jsonwebtoken";

export const postLogin = async (request, response) => {
  try {
    const email = request.body.email;
    const password = request.body.password;
    const secretJWT = "ponerAlgoSuperComplicadoConNumuerosYCaracteres1234";

    // TODO: validar acá contra la colección de usuarios
    const userRecovered = {
      email: email,
      password: password,
    };

    const token = jsonwebtoken.sign(userRecovered, secretJWT, {
      expiresIn: "120m",
    });

    response.status(200).json(token);
  } catch (error) {
    response.status(500).json({ error: "Error" });
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

export default postLogin;
