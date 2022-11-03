import { Router } from "express";
import { getContacts } from "../controllers/contactController";

const router = Router();

router.get("/contacts", getContacts);

export default router;
