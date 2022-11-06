import { findAllCompanies } from "../services/companyService";

export const getCompanies = async (request, response) => {
  try {
    let companies = await findAllCompanies();
    response.status(200).json(companies);
  } catch (error) {
    response.status(500).json({ error: "Try later..." });
  }
};
