import express from "express";
import ProductsRouter from "./src/routes/products.router.js";
import CartsRouter from "./src/routes/carts.router.js";
import RealTimeProductsRouter from "./src/routes/websockets.router.js";
import CategoriesRouter from "./src/routes/category.router.js";
import UsersRouter from "./src/routes/users.router.js";
import { engine } from "express-handlebars";

const { pathname: root } = new URL("./public", import.meta.url);

console.info("Public folder path: ", root);

const app = express();
app.use("/public", express.static(root));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración express-handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "src/views");

app.use("/api/users/", UsersRouter);
app.use("/api/categories/", CategoriesRouter);
app.use("/api/products/", ProductsRouter);
app.use("/api/carts/", CartsRouter);
app.use("/realtimeproducts/", RealTimeProductsRouter);

app.get("/", (req, res) => {
  res.render("home", { title: "Productos" });
});

export default app;
