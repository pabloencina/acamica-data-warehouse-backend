import { Router } from "express";
import {
  deleteRegionById,
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
router.delete("/regions/:regionId", deleteRegionById);

export default router;
