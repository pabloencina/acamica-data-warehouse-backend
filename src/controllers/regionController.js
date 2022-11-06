import { createRegion, findAllRegions, findRegionById, updateRegionById } from "../services/regionService";

export const getRegions = async (request, response) => {
  try {
    let regions = await findAllRegions();
    response.status(200).json(regions);
  } catch (error) {
    response.status(500).json({ error: "Try later..." });
  }
};

export const getRegionById = async (request, response) => {
  try {
    let regionById = await findRegionById(request.params.regionId);
    response.status(200).json(regionById);
  } catch (error) {
    if (error instanceof InvalidIdError) {
      response.status(406).json({ error: error.message });
    }
    response.status(500).json({ error: "Try later..." });
  }
};

export const postRegion = async (request, response) => {
  try {
    const body = request.body;
    let regionSaved = await createRegion(body);

    response.status(201).json(regionSaved);
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

export const putRegionById = async (request, response) => {
  try {
    const body = request.body;
    const id = request.params.regionId;
    let regionUpdated = await updateRegionById(id, body);
    response.status(200).json(regionUpdated);
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