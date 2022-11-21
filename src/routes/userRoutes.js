import { Router } from "express";
import {
  deleteUserById,
  getUserById,
  getUsers,
  postUser,
  putUserById,
} from "../controllers/userController.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:userId", getUserById);
router.post("/users", postUser);
router.put("/users/:userId", putUserById);
router.delete("/users/:userId", deleteUserById);

export default router;
