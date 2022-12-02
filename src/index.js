import app from "./app.js";
import "./database.js";

const port = process.env.PORT || "3500";

app.listen(port);

console.log("server on port", port);
