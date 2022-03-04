import { Router } from "express";
import { getUsers } from "../controllers/userController"; 
import { postUser } from "../controllers/userController"

const router = Router(); 

router.get("/users", getUsers);

router.post("/users", postUser);

export default router;
