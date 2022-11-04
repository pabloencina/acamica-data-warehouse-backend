import { Router } from "express";
import { getChannels } from "../controllers/channelController";

const router = Router();

router.get("/channels", getChannels);

export default router;
