import config from "./src/config/app.config.js";
import "./src/config/mongo.config.js";
import app from "./app.js";

const port = config.port || 8080;

const server = app.listen(port, () =>
  console.log(`🤖 Express Server listening on port ${port}`)
);

server.on("error", (err) => console.error(err));
