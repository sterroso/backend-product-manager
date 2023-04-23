import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 8080,
  cors: {
    origins: [/localhost/gi, "127.0.0.1"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
};
