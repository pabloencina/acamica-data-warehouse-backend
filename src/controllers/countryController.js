import {
  AlreadyInDbError,
  InvalidIdError,
  NotFoundError,
  ValidationFailedError,
} from "../errors/errors.js";
import {
  createCountry,
  findAllCountries,
  findCountryById,
  updateCountryById,
} from "../services/countryService.js";

export const getCountries = async (request, response) => {
  try {
    let countries = await findAllCountries();
    response.status(200).json(countries);
  } catch (error) {
    response.status(500).json({
      message: "Internal Server Error",
      error: "Internal Server Error",
    });
  }
};

export const getCountryById = async (request, response) => {
  try {
    let countryById = await findCountryById(request.params.countryId);
    response.status(200).json(countryById);
  } catch (error) {
    if (error instanceof InvalidIdError) {
      response.status(400).json({
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

export const postCountry = async (request, response) => {
  try {
    const body = request.body;
    let countrySaved = await createCountry(body);
    response.status(201).json(countrySaved);
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

export const putCountryById = async (request, response) => {
  try {
    const body = request.body;
    const id = request.params.countryId;
    let countryUpdated = await updateCountryById(id, body);
    response.status(200).json(countryUpdated);
  } catch (error) {
    if (error instanceof ValidationFailedError) {
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
