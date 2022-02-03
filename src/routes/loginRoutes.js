/*
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("..............Hello World");
});

export default router;
*/

import { Router } from "express";

import { postLogin } from "../controllers/loginController.js";
import  { loginSchema } from "../models/login.js";

const router = Router();

router.get("/login",async (req, res) => {

  //const login = await loginSchema

  res.json(login);
});

router.post("/login", postLogin);

export default router;
