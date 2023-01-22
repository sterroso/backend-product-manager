import { Router } from "express";
import ProductManager from "../ProductManager.js";
import Product from "../Product.js";

const productsPath = "public/productos.json";

const ProductsRouter = Router();

/**
 * Devuelve todos los productos, según los parámetros "limit" (cantidad máxima
 * de productos a devolver) y "offset" (cantidad de artículos, desde el
 * principio a ignorar).
 */
ProductsRouter.get("/", (req, res) => {
  const returnObject = {};

  let returnStatus = 200;

  const { limit, offset } = req.query;

  const intLimit = Number(limit ?? 0);

  if (isNaN(intLimit) || intLimit < 0 || intLimit % 1 !== 0) {
    returnStatus = 400;
    returnObject.status = "error";
    returnObject.message =
      'Error: Parameter "limit" must be a non-negative integer.';
  } else {
    const intOffset = Number(offset ?? 0);

    if (isNaN(intOffset) || intOffset < 0 || intOffset % 1 !== 0) {
      returnStatus = 400;
      returnObject.status = "error";
      returnObject.message =
        'Error: Parameter "offset" must be a non-negative integer.';
    } else {
      const productManager = new ProductManager(productsPath);

      const allProducts = productManager.getProducts();

      if (intOffset < allProducts.length) {
        let requestedObjects = [];
        if (intLimit === 0) {
          requestedObjects = allProducts;
        } else {
          requestedObjects = allProducts.slice(intOffset, intOffset + intLimit);
        }

        returnObject.status = "success";
        returnObject.products = requestedObjects;
      } else {
        returnStatus = 400;
        returnObject.status = "error";
        returnObject.message =
          'RangeError: Parameter "offset" is out of bounds.';
      }
    }
  }

  res.status(returnStatus).json(returnObject).end();
});

/**
 * Devuelve un único producto identificado por su propiedad id.
 *
 * El valor del parámetro "id" se compara con las propiedades de los productos
 * y se devuelve únicamente el que coincide. Si no se encuentra devuelve un
 * arreglo vacío.
 */
ProductsRouter.get("/:pid", (req, res) => {
  const returnObject = {};

  let returnStatus = 200;

  const { pid } = req.params;

  const intPid = Number(pid ?? 0);

  if (isNaN(intPid) || intPid < 1 || intPid % 1 !== 0) {
    returnStatus = 400;
    returnObject.status = "error";
    returnObject.message =
      "Error: Product id (pid) must be a positive integer.";
  } else {
    const productManager = new ProductManager(productsPath);

    const requestedProduct = productManager.getProductById(intPid);

    if (requestedProduct) {
      returnObject.status = "success";
      returnObject.product = requestedProduct;
    } else {
      returnStatus = 400;
      returnObject.status = "fail";
      returnObject.message = `No product with id ${pid} was found.`;
    }
  }

  res.status(returnStatus).json(returnObject).end();
});

/**
 * Crea un nuevo producto y lo agrega a la base de datos ProductManager.
 *
 * Si el producto es creado exitosamente, devuelve el objeto que representa al
 * producto, incluyendo el id generado automáticamnente por el manejador de
 * productos.
 */
ProductsRouter.post("/", (req, res) => {
  const returnObject = {};
  let returnStatus = 201;

  const {
    title,
    description,
    code,
    price,
    stock,
    category,
    status,
    thumbnails,
  } = req.body;

  if (!title || !description || !code || !price || !stock || !category) {
    returnStatus = 400;
    returnObject.status = "error";
    returnObject.message =
      "Bad Request: properties <title> (string), <description> (string), <code> (string), <price> (number), <stock> (number) and <category> (string) are mandatory.";
  } else {
    try {
      const product = new Product(
        title,
        description,
        code,
        price,
        stock,
        category,
        status,
        thumbnails ?? []
      );

      const productManager = new ProductManager(productsPath);

      const generatedId = productManager.addProduct(product);

      if (generatedId !== -1) {
        returnObject.status = "success";
        returnObject.product = productManager.getProductById(generatedId);
      } else {
        returnStatus = 400;
        returnObject.status = "fail";
        returnObject.message =
          "Product could not be added to ProductManager Database.";
      }
    } catch (err) {
      returnStatus = 400;
      returnObject.status = "error";
      returnObject.message = err.message;
    }
  }

  res.status(returnStatus).json(returnObject).end();
});

/**
 * Actualiza un producto existente en la base de datos ProductManager.
 *
 * El producto a actualizar se debe identificar proporcionando un valor para el
 * parámetro "pid" en la ruta.
 *
 * Los nuevos valores de las propiedades del producto se incluyen en el cuerpo
 * (body) de la petición.
 *
 * Si el producto es actualizado exitosamente, devuelve el objeto que
 * representa al producto tal como se encuentra en el manejador de productos.
 */
ProductsRouter.put("/:pid", (req, res) => {
  const returnObject = {};
  let returnStatus = 200;

  const { pid } = req.params;

  const intPid = Number(pid ?? 0);

  if (isNaN(intPid) || intPid < 1 || intPid % 1 !== 0) {
    returnStatus = 400;
    returnObject.status = "error";
    returnObject.message =
      "Error: Product id (pid) must be a positive integer.";
  } else {
    const {
      title,
      description,
      code,
      price,
      stock,
      category,
      status,
      thumbnails,
    } = req.body;

    const productManager = new ProductManager(productsPath);

    const existingProduct = productManager.getProductById(intPid);

    if (existingProduct) {
      try {
        const updateProduct = new Product(
          title ?? existingProduct.title,
          description ?? existingProduct.description,
          code ?? existingProduct.code,
          price ?? existingProduct.price,
          stock ?? existingProduct.stock,
          category ?? existingProduct.category,
          status ?? existingProduct.status,
          thumbnails ?? existingProduct.thumbnails
        );

        if (productManager.updateProduct(intPid, updateProduct)) {
          returnObject.status = "success";
          returnObject.updateCount = 1;
          returnObject.product = productManager.getProductById(intPid);
        } else {
          returnStatus = 400;
          returnObject.status = "fail";
          returnObject.message = "Fail: Product could not be updated.";
        }
      } catch (err) {
        returnStatus = 400;
        returnObject.status = "error";
        returnObject.message = err.message;
      }
    } else {
      returnStatus = 400;
      returnObject.status = "fail";
      returnObject.message = `No product with id ${pid} was found.`;
    }
  }

  res.status(returnStatus).json(returnObject).end();
});

/**
 * Elimina un producto existente en la base de datos ProductManager.
 *
 * El producto a eliminar se debe identificar proporcionando un valor para el
 * parámetro "pid" en la ruta.
 */
ProductsRouter.delete("/:pid", (req, res) => {
  const returnObject = {};
  let returnStatus = 200;

  const { pid: pid } = req.params;

  const intPid = Number(pid ?? 0);

  if (isNaN(intPid) || intPid < 1 || intPid % 1 !== 0) {
    returnStatus = 400;
    returnObject.status = "error";
    returnObject.message =
      "Error: Product id (pid) must be a positive integer.";
  } else {
    const productManager = new ProductManager(productsPath);

    if (productManager.getProducts().some((product) => product.id === intPid)) {
      const remainingProductsCount = productManager.deleteProduct(intPid);
      returnObject.status = "success";
      returnObject.deleteCount = 1;
      returnObject.deletedProductId = intPid;
    } else {
      returnStatus = 400;
      returnObject.status = "fail";
      returnObject.message = `No product with id ${pid} was found.`;
    }
  }

  res.status(returnStatus).json(returnObject).end();
});

export default ProductsRouter;
