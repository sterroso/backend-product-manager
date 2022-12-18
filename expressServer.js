import app, { PORT } from "./app.js";

const server = app.listen(PORT, () =>
  console.log(`Express Server listening on port ${PORT} 🤖`)
);

server.on("error", (err) => console.error(err));
