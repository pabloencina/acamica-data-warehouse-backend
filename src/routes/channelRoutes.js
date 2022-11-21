import { Router } from "express";
import { getChannels } from "../controllers/channelController.js";

const router = Router();

router.get("/channels", getChannels);

export default router;
