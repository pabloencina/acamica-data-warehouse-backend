import { InvalidCredentialsError, RequiredFieldsError } from "../errors/errors.js";
import { buildToken } from "../security/securityService.js";
import { findUserByEmailAndPassword } from "../services/userService.js";

export const postLogin = async (request, response) => {
  try {
    const email = request.body.email;
    const password = request.body.password;

    const userRecovered = await findUserByEmailAndPassword(email, password);
    const token = buildToken(userRecovered);

    response.status(200).json(token);
  } catch (error) {
    if (error instanceof RequiredFieldsError) {
      response.status(400).json({
        message: error.message,
        error: error.errors,
      });
    } else if (error instanceof InvalidCredentialsError) {
      response.status(401).json({
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
