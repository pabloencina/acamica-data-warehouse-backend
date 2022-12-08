import { Router } from "express";
import {
  deleteUserById,
  getUserById,
  getUsers,
  postUser,
  putUserById,
} from "../controllers/userController.js";
import { authorizeAdmin } from "../security/securityService.js";

const router = Router();

router.get("/users", authorizeAdmin, getUsers);
router.get("/users/:userId", authorizeAdmin, getUserById);
router.post("/users", authorizeAdmin, postUser);
router.put("/users/:userId", authorizeAdmin, putUserById);
router.delete("/users/:userId", authorizeAdmin, deleteUserById);

export default router;
