import { Router } from "express";
import {
  getCompanies,
  getCompanyById,
  postCompany,
  putCompanyById,
} from "../controllers/companyController.js";

const router = Router();

router.get("/companies", getCompanies);
router.get("/companies/:companyId", getCompanyById);
router.post("/companies", postCompany);
router.put("/companies/:companyId", putCompanyById);

export default router;
