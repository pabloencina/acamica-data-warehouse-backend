import { Router } from "express";
import {
  deleteCityById,
  getCities,
  getCityById,
  postCity,
  putCityById,
} from "../controllers/cityController.js";

const router = Router();

router.get("/cities", getCities);
router.get("/cities/:cityId", getCityById);
router.post("/cities", postCity);
router.put("/cities/:cityId", putCityById);
router.delete("/cities/:cityId", deleteCityById);

export default router;
