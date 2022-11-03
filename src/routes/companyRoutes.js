import { Router } from "express";
import { getCompanies } from "../controllers/companyController";

const router = Router();

router.get("/companies", getCompanies);

export default router;
