import { Router } from "express";
import {
  deleteCountryById,
  getCountries,
  getCountryById,
  postCountry,
  putCountryById,
} from "../controllers/countryController.js";

const router = Router();

router.get("/countries", getCountries);
router.get("/countries/:countryId", getCountryById);
router.post("/countries", postCountry);
router.put("/countries/:countryId", putCountryById);
router.delete("/countries/:countryId", deleteCountryById);

export default router;
