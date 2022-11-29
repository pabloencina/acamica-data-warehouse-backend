import { Router } from "express";
import {
  getCompanies,
  getCompanyById,
  postCompany,
  putCompanyById,
  deleteCompanyById,
} from "../controllers/companyController.js";

const router = Router();

router.get("/companies", getCompanies);
router.get("/companies/:companyId", getCompanyById);
router.post("/companies", postCompany);
router.put("/companies/:companyId", putCompanyById);
router.delete("/companies/:companyId", deleteCompanyById);

export default router;
