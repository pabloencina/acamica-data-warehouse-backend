import {
  AlreadyInDbError,
  InvalidIdError,
  NotFoundError,
  ValidationFailedError,
} from "../errors/errors.js";
import {
  createCity,
  findAllCities,
  findCityById,
  updateCityById,
} from "../services/cityService.js";

export const getCities = async (request, response) => {
  try {
    let cities = await findAllCities();
    response.status(200).json(cities);
  } catch (error) {
    response.status(500).json({
      message: "Internal Server Error",
      error: "Internal Server Error",
    });
  }
};

export const getCityById = async (request, response) => {
  try {
    let cityById = await findCityById(request.params.cityId);
    response.status(200).json(cityById);
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

export const postCity = async (request, response) => {
  try {
    const body = request.body;
    let countrySaved = await createCity(body);
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

export const putCityById = async (request, response) => {
  try {
    const body = request.body;
    const id = request.params.cityId;
    let cityUpdated = await updateCityById(id, body);
    response.status(200).json(cityUpdated);
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
