import express from "express";
import app from "./app";
import "./databese";


app.listen(3000);

console.log("server on port", 3000);

const path = require("path")

console.log(path.join(__dirname, "public"));

app.use(express.static(path.join(__dirname, "public"))) //Conecta el Front con el back