import findAllCities from "../services/cityService";

export const getCities = async (request, response) => {
  try {
    let cities = await findAllCities();
    response.status(200).json(cities);
  } catch (error) {
    response.status(500).json({ error: "Try later..." });
  }
};
