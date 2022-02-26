//import { DotenvConfigOptions } from "dotenv";
import app from "./app";
import "./database";

app.listen(3500);

console.log("server on port", 3500);
