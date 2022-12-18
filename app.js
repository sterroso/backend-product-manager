import express from "express";
import ProductsRouter from "./src/routes/products.router.js";
import CartsRouter from "./src/routes/carts.router.js";

export const PORT = 8080;

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products/", ProductsRouter);
app.use("/api/carts/", CartsRouter);

export default app;
