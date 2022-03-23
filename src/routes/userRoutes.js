import { Router } from "express";
import { getUsers } from "../controllers/userController"; 
import { getUserById } from "../controllers/userController";
import { postUser } from "../controllers/userController";
import { putUsers } from "../controllers/userController"

const router = Router(); 

router.get("/users", getUsers);

router.get("/users/:userId", getUserById);

router.post("/users", postUser);

router.put("/users", putUsers);

export default router;
