import app, { PORT } from "./app.js";
import { Server } from "socket.io";
import ProductManager from "./src/ProductManager.js";
import Product from "./src/Product.js";

const productsPath = "public/productos.json";

const productManager = new ProductManager(productsPath);

const server = app.listen(PORT, () =>
  console.log(`Express Server listening on port ${PORT} 🤖`)
);

server.on("error", (err) => console.error(err));

const webSocketServer = new Server(server);

webSocketServer.on("connection", (socket) => {
  const allProducts = productManager.getProducts();

  socket.emit("init", { products: allProducts });

  socket.on("addNewProduct", (product) => {
    const {
      productCode,
      productCategory,
      productTitle,
      productDescription,
      productPrice,
      productStock,
      productStatus,
    } = product;

    try {
      const newProduct = new Product(
        productTitle,
        productDescription,
        productCode,
        productPrice,
        productStock,
        productCategory,
        productStatus
      );

      const newProductId = productManager.addProduct(newProduct);

      if (newProductId !== -1) {
        const newProductsList = productManager.getProducts();
        // La nueva lista de productos se notifica a todos los clientes.
        webSocketServer.emit("addNewProduct", {
          products: newProductsList,
          newProductId,
          newProductTitle: newProduct.title,
        });
      } else {
        // El error sólo se notifica al cliente que envía la petición.
        socket.emit("error", {
          status: "error",
          message: "No se pudo agregar el producto.",
        });
      }
    } catch (err) {
      // El error sólo se notifica al cliente que envía la petición.
      socket.emit("error", { status: "error", message: err.message });
    }
  });
});
