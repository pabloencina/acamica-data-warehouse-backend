import { connect } from "mongoose";

(async () => {
  const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017";
  const dbName = process.env.DB_NAME || "datawarehouse";
  try {
    console.log(process.env.MONGO_URL);
    console.log(`${mongoUrl}/${dbName}`);
    const db = await connect(`${mongoUrl}/${dbName}`);
    console.log("DB connected to", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();
