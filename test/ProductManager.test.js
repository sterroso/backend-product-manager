import test, { afterEach } from "node:test";
import assert from "node:assert/strict";
import { existsSync, unlinkSync } from "node:fs";
import ProductManager from "../src/ProductManager.js";
import Product from "../src/Product.js";

// Duarante el segundo desafío entregable se hace persistente el ProductManager
// y es por eso que ahora el constructor necesita que se le pase, como pará-
// metro, la ruta y nombre del archivo donde persistirán los cambios.
const ProductManagerFilePath = "./TestProductManager.json";

// Limpia los archivos de persistencia después de cada prueba.
afterEach(() => {
  if (existsSync(ProductManagerFilePath)) {
    unlinkSync(ProductManagerFilePath);
    console.info(`Se ha borrado el archivo ${ProductManagerFilePath}.`);
  }
});

/**
 * Proceso de testing del entregable (1er Desafío Entregable):
 */

/**
 * 1. Se creará una instancia de la clase "ProductManager".
 */
test("should create a new instance of ProductManager class", () => {
  const productManager = new ProductManager(ProductManagerFilePath);

  const fileExists = existsSync(ProductManagerFilePath);

  // Prueba que se haya creado el archivo que contendrá al ProductManager.
  assert.strictEqual(
    fileExists,
    true,
    "1. ProductManager instantiation Error: file was not created."
  );
});

/**
 * 2. Se llamará al método "getProducts()" recién creada la instancia, debe
 *    devolver un arreglo vacío [].
 */
test("should return an empty array when calling the getProducts() method", () => {
  const productManager = new ProductManager(ProductManagerFilePath);

  const productsArray = productManager.getProducts();

  assert.deepStrictEqual(
    productsArray,
    [],
    "2. getProducts() Error: method returns a non-empty array."
  );
});

/**
 * 3. Se llamará al método "addProduct()" con los campos:
 *    - title: "producto prueba"
 *    - description: "Este es un producto prueba"
 *    - price: 200
 *    - thumbail: "Sin imagen"  NOTA: En la 1a preentrega del proyecto final
 *                                    se cambió este requerimiento. El campo
 *                                    ahora se llama "thumbnails", y es un
 *                                    arreglo (Array) de strings. Por lo que
 *                                    la prueba se cambia a un arreglo vacío.
 *    - code: "abc123"
 *    - stock: 25
 * 4. El objeto debe agregarse satisfactoriamente con un id generado auto-
 *    máticamente SIN REPETIRSE.
 * 5. Se llamará al método "getProducts()" nuevamente, esta vez debe aparecer
 *    el producto recién agregado.
 * 6. Se llamará al método "addProduct()" con los mismos campos de arriba, debe
 *    arrojar un error porque el código estará repetido.
 * 7. Se evaluará que "getProductById()" devuelva error si no encuentra el pro-
 *    ducto, o el producto en caso de encontrarlo.
 */
test("should add a new Product to ProductManger instance.", () => {
  // 3. Se llamará ...
  // Producto con los valores de prueba
  const newProduct = new Product(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "abc123",
    25,
    []
  );

  const productManager = new ProductManager(ProductManagerFilePath);

  // Consulta el próximo id que generará la instancia de ProductManager.
  const expectedId = productManager.nextProductId;

  // 3. Se llamará al método "addProduct()" ...
  // Llamada al método.
  const actualId = productManager.addProduct(newProduct);

  // El id devuelto debe ser igual al id esperado.
  assert.strictEqual(
    actualId,
    expectedId,
    "3. addProduct() Error: added product does not match expected value."
  );

  // 4. El objeto debe agregarse satisfactoriamente ...
  // El producto esperado debe tener los mismos valores con que fue creado,
  // agregando el id generado automáticamente.
  const expectedProduct = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnails: [],
    code: "ABC123",
    stock: 25,
    id: expectedId,
  };

  const actualProduct = productManager.getProductById(actualId);

  assert.deepStrictEqual(
    actualProduct,
    expectedProduct,
    "4. addProduct() Error: added product does not match retrieved product."
  );

  // 5. Se llamará al método "getProducts()" nuevamente ...
  const productsArray = productManager.getProducts();

  // El arreglo debe contener 1 (uno) y sólo 1 producto.
  assert.strictEqual(
    productsArray.length,
    1,
    "5. getProducts() Error: returned array contains more than 1 product."
  );

  // El código del único producto en el arreglo debe coincidir con
  // el código con el que fue creado el producto.
  assert.strictEqual(
    productsArray.some((product) => product.code === newProduct.code),
    true,
    "5. getProducts() Error: product's code does not match."
  );

  // 6. Se llamará al método "addProduct()" con los mismos campos de arriba ...
  const expectedAddProductError = {
    name: "Error",
    message: `There is already a product with code ${newProduct.code}.`,
  };

  assert.throws(
    () => productManager.addProduct(newProduct),
    expectedAddProductError,
    "6. addProduct() Error: duplicated code does not throw expected Error."
  );

  // 7. Se evaluará que "getProductById()" devuelva error si no encuentra ...
  const nonExistentId = productManager.nextProductId + 1000;

  const expectedGetProductByIdError = {
    name: "Error",
    message: `Product with id ${nonExistentId} was not found.`,
  };

  assert.throws(
    () => productManager.getProductById(nonExistentId),
    expectedGetProductByIdError,
    "7. getProductById() Error: non-existent value for id parameter does not throw expected Error."
  );

  assert.deepStrictEqual(
    productManager.getProductById(actualId),
    expectedProduct,
    "7. getProductById() Error: returned object does not match expected object."
  );
});
