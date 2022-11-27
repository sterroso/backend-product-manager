import Product from "./src/Product.js";
import ProductManager from "./src/ProductManager.js";

// Se creará una instancia de la clase “ProductManager”
const productManager = new ProductManager();
if (productManager) {
  console.log('New ProductManager instance has been created.');
  console.log(`ProductManager instance persist file path: ${productManager.getPersistPath()}`);
}