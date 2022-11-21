import { Router } from "express";
import { getContacts } from "../controllers/contactController.js";

const router = Router();

router.get("/contacts", getContacts);

export default router;
