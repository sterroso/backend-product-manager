import express from "express";
import ProductsRouter from "./src/routes/products.router.js";
import CartsRouter from "./src/routes/carts.router.js";
import ProducstRouter from "./src/routes/websockets.router.js";
import { engine } from "express-handlebars";

const { pathname: root } = new URL("./public", import.meta.url);

console.info("Public folder path: ", root);

export const PORT = 8080;

const app = express();
app.use("/public", express.static(root));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Configuración express-handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "src/views");

app.use("/api/products/", ProductsRouter);
app.use("/api/carts/", CartsRouter);
app.use("/realtimeproducts/", ProducstRouter);

app.get("/", (req, res) => {
  res.render("home", { title: "Productos" });
});

export default app;
