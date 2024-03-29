import {
  AlreadyInDbError,
  IntegrityError,
  InvalidIdError,
  NotFoundError,
  ValidationFailedError,
} from "../errors/errors.js";
import {
  createCompany,
  serviceDeleteCompanyById,
  findAllCompanies,
  findCompanyById,
  updateCompanyById,
} from "../services/companyService.js";

export const getCompanies = async (request, response) => {
  try {
    let companies = await findAllCompanies();
    response.status(200).json(companies);
  } catch (error) {
    response.status(500).json({
      message: "Internal Server Error",
      error: "Internal Server Error",
    });
  }
};

export const getCompanyById = async (request, response) => {
  try {
    let cityById = await findCompanyById(request.params.companyId);
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

export const postCompany = async (request, response) => {
  try {
    const body = request.body;
    let countrySaved = await createCompany(body);
    response.status(201).json(countrySaved);
  } catch (error) {
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

export const putCompanyById = async (request, response) => {
  try {
    const body = request.body;
    const id = request.params.companyId;
    let countryUpdated = await updateCompanyById(id, body);
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

export const deleteCompanyById = async (request, response) => {
  try {
    const id = request.params.companyId;
    let companyDeleted = await serviceDeleteCompanyById(id);
    response.status(200).json(companyDeleted);
  } catch (error) {
    if (error instanceof NotFoundError) {
      response.status(404).json({
        message: error.message,
        error: error.message,
      });
    } else if (error instanceof IntegrityError) {
      response.status(409).json({
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
