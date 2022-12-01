import { Router } from "express";
import {
  deleteContactById,
  getContactById,
  getContacts,
  postContact,
  putContactById,
} from "../controllers/contactController.js";

const router = Router();

router.get("/contacts", getContacts);
router.get("/contacts/:contactId", getContactById);
router.post("/contacts", postContact);
router.put("/contacts/:contactId", putContactById);
router.delete("/contacts/:contactId", deleteContactById);

export default router;
