import { Router } from "express";
import { getCities, getCityById, postCity, putCityById } from "../controllers/cityController";

const router = Router();

router.get("/cities", getCities);
router.get("/cities/:cityId", getCityById);
router.post("/cities", postCity);
router.put("/cities/:cityId", putCityById);

export default router;
