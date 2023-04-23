import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

try {
  mongoose.set("strictQuery", false);
  mongoose.set("sanitizeFilter", true);

  mongoose.connect(process.env?.MONGODB_URI, (error) => {
    if (error) {
      console.error("Mongoose Connect Error! 🤔");
      console.error(error.message);
    } else {
      console.info("Mongoose Connect successful! 🤖");
    }
  });
} catch (error) {
  console.error("Error while trying to connect MongoDB! 🤔");
  console.error(error.message);
}
