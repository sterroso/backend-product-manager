import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", false);

mongoose.connect(process.env?.MONGODB_CONNECTION_STRING, (err) => {
  if (err) {
    console.error("¡No se pudo establecer conexión con MongoDB!");
    console.error(err.message);
  } else {
    console.info("🤖 ¡Conexión exitosa a MongoDB!");
  }
});
