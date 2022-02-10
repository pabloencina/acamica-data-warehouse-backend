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

const router = Router();

router.post("/login", postLogin);

export default router;
