import express from "express";
import loginRoutes from "./routes/loginRoutes";

const app = express();

app.use(loginRoutes);

export default app;
