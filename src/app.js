import express from "express";
import bodyParser from "body-parser";

import loginRoutes from "./routes/loginRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import regionRoutes from "./routes/regionRoutes.js";
import countryRoutes from "./routes/countryRoutes.js";
import cityRoutes from "./routes/cityRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

app.use((req, res, next) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  } catch (error) {
    console.log(error);
  }

  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(loginRoutes);
app.use(userRoutes);
app.use(regionRoutes);
app.use(countryRoutes);
app.use(cityRoutes);
app.use(companyRoutes);
app.use(contactRoutes);

export default app;
