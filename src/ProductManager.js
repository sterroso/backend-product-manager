import Product from "./Product.js";
import { writeFileSync, readFileSync, existsSync } from "fs";

export default class ProductManager {
  static #lastProductId;

  static #defaultPersistFilePath = "./ProductManager.json";

  static #persistFileOptions = {
    encoding: "utf-8",
  };

  #products = [];

  #path = "";

  constructor(persistFilePath) {
    this.#path = persistFilePath ?? ProductManager.#defaultPersistFilePath;
    this.#init();
  }

  get persistPath() {
    return this.#path;
  }

  /**
   * Devuelve la cantidad de productos en esta instancia de
   * ProductManger.
   */
  get count() {
    return this.#products.length;
  }

  /**
   * Devuelve el que será el próximo id de producto.
   */
  get nextProductId() {
    return ProductManager.#lastProductId + 1;
  }

  get lastProductId() {
    return ProductManager.#lastProductId;
  }

  /**
   * Agrega un producto a la colección de productos. Si el producto pasado
   * mediante el parámetro product, tiene un código repetido, éste no se
   * agregará a la colección.
   *
   * Si se agrega exitosamente el producto a la colección, devuelve el id
   * asignado, de lo contrario devuelve -1 (uno negativo).
   *
   * @param {Product} newProduct - El producto que va a agregarse a la colección.
   * @throws {Error} si el valor de la propiedad code del parámetro newProduct
   * está duplicado (ya ha un producto en el ProductManager con ese mismo valor
   * en la propiedad code).
   */
  addProduct = (newProduct) => {
    const existingProduct = this.getProductByCode(newProduct.code);

    if (existingProduct) {
      throw new Error(
        `There is already a product with code ${newProduct.code}.`
      );
    }

    newProduct.id = ProductManager.#generateNextProductId();

    this.#products.push(newProduct);

    this.#persist();

    // Devuelve el id del nuevo producto como indicador que la
    // operación fue exitosa.
    return newProduct.id;
  };

  /**
   * Updates a product identified by it's Product Id. If the
   * product exists within the products array of this ProductManager instance,
   * its values will be updated with the new values passed through the
   * product parameter.
   *
   * @param {int} productId The product's id to be updated,
   * @param {Product} updateProduct A product with the new values.
   * @returns true if the product was found and updated.
   * @throws {Error} if could not find a product identified by the ProductId parameter.
   */
  updateProduct = (productId, updateProduct) => {
    const existingProduct = this.getProductById(productId);

    if (existingProduct) {
      existingProduct.title = updateProduct.title;
      existingProduct.description = updateProduct.description;
      existingProduct.code = updateProduct.code;
      existingProduct.price = updateProduct.price;
      existingProduct.status = updateProduct.status;
      existingProduct.stock = updateProduct.stock;
      existingProduct.category = updateProduct.category;
      existingProduct.thumbnails = updateProduct.thumbnails;

      this.#persist();

      return true;
    } else {
      throw new Error(
        `No product was updated. Product with id ${productId} was not found.`
      );
    }
  };

  /**
   * Deletes a product, identified by its id, if found within the
   * products array of this ProductManager instance.
   *
   * @param {int} productId The id of the product to be deleted.
   * @returns the length of the products array after deletion.
   * @throws {Error} if could not find a product identified by the ProductId parameter.
   */
  deleteProduct = (productId) => {
    const existingProduct = this.getProductById(productId);

    if (existingProduct) {
      this.#products = this.#products.filter(
        (product) => product.id !== productId
      );

      this.#persist();

      return this.#products.length;
    } else {
      throw new Error(
        `No product was deleted. Product with id ${productId} was not found.`
      );
    }
  };

  /**
   * Borra todos los productos y reestablece el lastProductId a 0 (cero).
   */
  /**
   *
   * @returns Devuelve la colección de productos.
   */
  getProducts = () => {
    return this.#products;
  };

  /**
   * Busca un producto específico en la colección de productos mediante
   * su identificador (campo id). Si lo encuentra, devuelve el producto,
   * de lo contrario devuelve indefinido (undefined).
   *
   * @param {int} pId - El identificador del producto buscado.
   * @returns El producto (Object) cuyo id coincide con el argumento
   * pasado mediante el parámetro productId.
   */
  getProductById = (pId) =>
    this.#products.find((product) => product.id === pId);

  getProductByCode = (pCode) =>
    this.#products.find(
      (product) => product.code === pCode.trim().toUpperCase()
    );

  /**
   * Initializes the current ProductManager Instance.
   * If the persistence file exists, and contains products, they
   * will be loaded as well as the lastProductId value.
   */
  #init = () => {
    if (existsSync(this.#path)) {
      const fileReader = readFileSync(
        this.#path,
        ProductManager.#persistFileOptions
      );
      const persistedProductManager = JSON.parse(fileReader);

      ProductManager.#lastProductId = persistedProductManager.lastProductId;

      this.#products = persistedProductManager.products;
    } else {
      ProductManager.#lastProductId = 0;
      this.#products = [];
    }
  };

  /**
   * Provides a stringified object containing the lasProductId and
   * the products array.
   *
   * @returns a stringified object ready to be saved.
   */
  #getPersistObject = () => {
    const persistObject = {};
    persistObject.lastProductId = this.lastProductId;
    persistObject.products = this.#products;

    return JSON.stringify(persistObject);
  };

  /**
   * Saves the products array and the last product Id assigned.
   */
  #persist = () => {
    writeFileSync(
      this.#path,
      this.#getPersistObject(),
      ProductManager.#persistFileOptions
    );
  };

  /**
   * Increments the Last Product Id and returns the new value.
   *
   * @returns a new Product Id.
   */
  static #generateNextProductId = () => ++ProductManager.#lastProductId;
}
