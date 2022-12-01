import express from 'express';
import ProductManager from "./src/ProductManager.js";

const app = express();

const productManager = new ProductManager();

// Raíz del sitio
app.get('/', (req, res) => {
  res.send('<p><a href="/products">Lista de Productos</a></p>');
});

// Devuelve la lista de productos delimitada por los parámetros de
// consulta (query params) offset (desplazamiento) y limit (límite),
// donde offset corresponde al primer índice, de la lista de productos,
// y limit corresponde a la cantidad máxima de productos que se devolverán.
// De manera que los productos devueltos son un subconjunto de la lista
// de todos los productos en el productManager.
//
// Si offset + limit resulta en un índice superior al del último producto
// de la lista de productos, se truncarán los resultados hasta el último
// producto disponible.
app.get('/products', (req, res) => {
  const responseObject = {};

  const allProducts = productManager.getProducts();

  const { offset, limit } = req.query;

  const offsetNumber = Number(offset ?? 0);

  const limitNumber = Number(limit ?? 0);

  // Math.max function filters negative values passed through the query params.
  // isNaN prevents NaN values to be evaluated in Math.max
  const startIndex = Math.max(isNaN(offsetNumber) ? 0 : offsetNumber, 0);

  const pageLength = Math.max(isNaN(limitNumber) ? 0 : limitNumber, 0);

  if (startIndex < allProducts.length) {
    const lastIndex = pageLength === 0 ? allProducts.length : Math.min(allProducts.length, (startIndex + pageLength));

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