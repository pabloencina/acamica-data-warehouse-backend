import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
dotenv.config();

import cityRoutes from "./routes/cityRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import countryRoutes from "./routes/countryRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import regionRoutes from "./routes/regionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { expressJwtHandler } from "./security/expressJwtHandler.js";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(expressJwtHandler);

app.use(loginRoutes);
app.use(userRoutes);
app.use(regionRoutes);
app.use(countryRoutes);
app.use(cityRoutes);
app.use(companyRoutes);
app.use(contactRoutes);

export default app;
