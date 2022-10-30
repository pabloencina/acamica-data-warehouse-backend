import { Router } from "express";
import { deleteUserById, getUsers } from "../controllers/userController"; 
import { getUserById } from "../controllers/userController";
import { postUser } from "../controllers/userController";
import { putUserById } from "../controllers/userController"

const router = Router(); 

router.get("/users", getUsers);

router.get("/users/:userId", getUserById);

router.post("/users", postUser);

router.put("/users/:userId", putUserById);

router.delete("/users/:userId", deleteUserById);

export default router;
