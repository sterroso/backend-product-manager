import Product from "./src/Product.js";
import ProductManager from "./src/ProductManager.js";

const productManager = new ProductManager();

for (let i = 0; i < 35; i++) {
  const newProduct = new Product(
    `Producto ${i + 1}`,
    `Descripción del Producto ${i + 1}`,
    Math.floor((Math.random() * 95000) + 5000)/100,
    'No thumbnail',
    `CODE${i + 1}`,
    Math.floor((Math.random() * 1000) + 100)
  );

  console.log(productManager.addProduct(newProduct));
}
