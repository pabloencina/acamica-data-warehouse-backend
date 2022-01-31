import express from "express";
import res from "express/lib/response";

const app = express();
app.listen(3000);

app.get("/", (req, res) => {
  res.send("Hello World");
});
console.log("server on port", 3000);
