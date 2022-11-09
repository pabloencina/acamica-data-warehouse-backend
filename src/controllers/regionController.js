import {
  AlreadyInDbError,
  InvalidIdError,
  NotFoundError,
  ValidationFailedError,
} from "../errors/errors";
import {
  createRegion,
  findAllRegions,
  findRegionById,
  updateRegionById,
} from "../services/regionService";

export const getRegions = async (request, response) => {
  try {
    let regions = await findAllRegions();
    response.status(200).json(regions);
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRegionById = async (request, response) => {
  try {
    let regionById = await findRegionById(request.params.regionId);
    response.status(200).json(regionById);
  } catch (error) {
    if (error instanceof InvalidIdError) {
      response.status(400).json({
        error: error.message,
        message: error.message,
      });
    }
    response.status(500).json({
      message: "Internal Server Error",
      error: "Internal Server Error",
    });
  }
};

export const postRegion = async (request, response) => {
  try {
    const body = request.body;
    let regionSaved = await createRegion(body);
    response.status(201).json(regionSaved);
  } catch (error) {
    if (error instanceof AlreadyInDbError) {
      response.status(409).json({
        error: error.message,
        message: error.message,
      });
    } else if (error instanceof ValidationFailedError) {
      response.status(400).json({
        message: error.message,
        errors: error.errors,
      });
    } else {
      response.status(500).json({
        message: "Internal Server Error",
        error: "Internal Server Error",
      });
    }
  }
};

export const putRegionById = async (request, response) => {
  try {
    const body = request.body;
    const id = request.params.regionId;
    let regionUpdated = await updateRegionById(id, body);
    response.status(200).json(regionUpdated);
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
