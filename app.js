import express from 'express';
import ProductManager from "./src/ProductManager.js";

const PORT = 8080;

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

  // Returns an error if value passed through offset parameter is not
  // convertible to Number.
  if (isNaN(offsetNumber)) {
    responseObject.status = 'error';
    responseObject.error = `Error: '${offset}' is not a valid offset value.`;

    res.status(400).json(responseObject).end();

    return;
  }

  // Returns an error if value passed through offset paramter is a
  // negative or non-integer value.
  if (offsetNumber < 0 || offsetNumber % 1 !== 0) {
    responseObject.status = 'error';
    responseObject.error = `Error: offset parameter must be a non-negative integer.`;

    res.status(400).json(responseObject).end();

    return;
  }

  const limitNumber = Number(limit ?? 0);

  // Returns an error if value passed through limit parameter is not
  // convertible to Number.
  if (isNaN(limitNumber)) {
    responseObject.status = 'error';
    responseObject.error = `Error: '${limit}' is not a valid limit value.`;

    res.status(400).json(responseObject).end();

    return;
  }

  // Returns an error if value passed through limit parameter is a
  // negative or non-integer value.
  if (limitNumber < 0 || limitNumber % 1 !== 0) {
    responseObject.status = 'error';
    responseObject.error = 'Error: limit parameter must be a non-negative integer.';

    res.status(400).json(responseObject).end();

    return;
  }

  // Checks if offsetNumber value is less than the length of the
  // products array.
  if (offsetNumber < allProducts.length) {
    const lastIndex = limitNumber === 0 ? allProducts.length : Math.min(allProducts.length, (offsetNumber + limitNumber));

    const filteredProducts = allProducts.slice(offsetNumber, lastIndex);

    responseObject.status = 'success';
    responseObject.products = filteredProducts;
  } else {
    responseObject.status = 'error';
    responseObject.error = 'Error: offset value out of bounds.';
  }

  res.json(responseObject);
});

// Devuelve un producto específico identificado por su id.
app.get('/products/:id', (req, res) => {
  const responseObject = {};

  const productId = Number(req.params.id);

  // Returns an error if value passed through id parameter is not
  // a number.
  if (isNaN(productId)) {
    responseObject.status = 'error';
    responseObject.error = `Error: '${req.params.id}' is not a valid product id.`;

    res.status(400).json(responseObject).end();

    return;
  }

  try {
    const product = productManager.getProductById(productId);

    responseObject.status = 'success';
    responseObject.product = product;
  } catch (err) {
    responseObject.status = 'error';
    responseObject.error = `${err}`;
  }

  res.json(responseObject);
});

// Agrega un nuevo producto al ProductManager
app.put('/api/products', (req, res) => {
  const { payload } = req.body;

  console.log(payload);
});

app.listen(PORT, () => console.log(`Servidor escuchando peticiones en el puerto ${PORT}: http://localhost:${PORT}/`));