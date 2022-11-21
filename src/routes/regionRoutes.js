import { Router } from "express";
import {
  getRegionById,
  getRegions,
  postRegion,
  putRegionById,
} from "../controllers/regionController.js";

const router = Router();

router.get("/regions", getRegions);
router.get("/regions/:regionId", getRegionById);
router.post("/regions", postRegion);
router.put("/regions/:regionId", putRegionById);

export default router;
