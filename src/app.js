import express from "express";
import bodyParser from "body-parser";

import loginRoutes from "./routes/loginRoutes";
import userRoutes from "./routes/userRoutes";
import regionRoutes from "./routes/regionRoutes";
import countryRoutes from "./routes/countryRoutes";

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

app.use(loginRoutes);
app.use(userRoutes);
app.use(regionRoutes);
app.use(countryRoutes);

export default app;
