import express from 'express';
import ProductManager from "./src/ProductManager.js";

const app = express();

const productManager = new ProductManager();

// Raíz del sitio
app.get('/', (req, res) => {
  res.send('<p><a href="/products">Lista de Productos</a></p>');
});

// Devuelve la lista
app.get('/products', (req, res) => {
  const responseObject = {};

  const requestQuery = req.query;

  const { offset, limit } = requestQuery;

  const startIndex = Number(offset ?? 0);

  const pageLength = Number(limit ?? 10);

  const allProducts = productManager.getProducts();

  if (startIndex < allProducts.length) {
    const lastIndex = Math.min(allProducts.length, (startIndex + pageLength));

    const filteredProducts = allProducts.slice(startIndex, lastIndex);

    responseObject.status = 'success';
    responseObject.products = filteredProducts;
  } else {
    responseObject.status = 'error';
    responseObject.error = 'Error: offset value out of bounds.';
  }

  res.send(responseObject);
});

// Devuelve un producto específico identificado por su id.
app.get('/products/:id', (req, res) => {
  const productId = Number(req.params.id);

  const responseObject = {};

  try {
    const product = productManager.getProductById(productId);

    responseObject.status = 'success';
    responseObject.product = product;
  } catch (err) {
    responseObject.status = 'error';
    responseObject.error = `${err}`;
  }

  res.send(responseObject);
});

app.listen(8080, () => console.log('Servidor escuchando peticiones en el puerto 8080: http://localhost:8080/'));