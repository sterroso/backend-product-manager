import Product from "./Product.js";
import { writeFileSync, readFileSync, existsSync } from 'fs';

export default class ProductManager {
  static #lastProductId;

  static #defaultPersistFilePath = './ProductManager.json';

  static #persistFileOptions = {
    encoding: 'utf-8',
  };

  #products = [];

  constructor(persistFilePath) {
    this.path = (persistFilePath ?? ProductManager.#defaultPersistFilePath);
    this.#init();
  }

  /**
   * Agrega un producto a la colección de productos. Si el producto pasado
   * mediante el parámetro product, tiene un código repetido, éste no se
   * agregará a la colección.
   *
   * Si se agrega exitosamente el producto a la colección, devuelve el id
   * asignado, de lo contrario devuelve -1 (uno negativo).
   *
   * @param {Product} product - El producto que va a agregarse a la colección.
   */
  addProduct = (product) => {
    if(!this.#products.some(p => p.code === product.code)) {
      product.id = ProductManager.#getNewProductId();

      this.#products.push(product);

      this.#persist();

      // Devuelve el id del nuevo producto como indicador que la
      // operación fue exitosa.
      return product.id;
    }

    throw new Error(`There is already a product with code ${product.code}.`);
  }

  /**
   *
   * @returns Devuelve la colección de productos.
   */
  getProducts = () => {
    return this.#products;
  }

  /**
   * Busca un producto específico en la colección de productos mediante
   * su identificador (campo id). Si lo encuentra, devuelve el producto,
   * de lo contrario devuelve indefinido (undefined).
   *
   * @param {int} productId - El identificador del producto buscado.
   * @returns El producto (Object) cuyo id coincide con el argumento
   * pasado mediante el parámetro productId.
   */
  getProductById = (productId) => {
    const foundProduct = this.#products.find(product => product.id === productId);

    if (foundProduct) return foundProduct;

    throw new Error(`Product with id ${productId} was not found.`);
  }

  getProductByCode = (productCode) => {
    const foundProduct = this.#products.find(product => product.code === productCode.trim().toUpperCase());

    if (foundProduct) return foundProduct;

    throw new Error(`Product with code ${productCode} was not found.`);
  }

  /**
   * Provides the path to the file where Products will be saved
   * by the current ProductManager instance.
   *
   * @returns The path to te file where Products will be saved.
   */
  getPersistPath = () => this.path;

  /**
   * Initializes the current ProductManager Instance.
   * If the persistence file exists, and contains products, they
   * will be loaded as well as the lastProductId value.
   */
  #init = () => {
    if (existsSync(this.getPersistPath())) {
      const fileReader = readFileSync(this.getPersistPath(), ProductManager.#persistFileOptions);
      const persistedProductManager = JSON.parse(fileReader);

      ProductManager.#setLastProductId(persistedProductManager.lastProductId);

      this.#setProducts(persistedProductManager.products);
    } else {
      ProductManager.#setLastProductId(0);
    }
  }

  #setProducts = (products) => {
    this.#products = [...products];

    return this.#products.length;
  }

  /**
   * Provides a stringified object containing the lasProductId and
   * the products array.
   *
   * @returns a stringified object ready to be saved.
   */
  #getPersistObject = () => {
    const persistObject = {};
    persistObject.lastProductId = ProductManager.getLastProductId();
    persistObject.products = this.getProducts();

    return JSON.stringify(persistObject);
  }

  /**
   * Saves the products array and the last product Id assigned.
   */
  #persist = () => {
    writeFileSync(this.getPersistPath(), this.#getPersistObject(), ProductManager.#persistFileOptions);
  }

  /**
   * Gets the last product id kept by the ProductManager class.
   *
   * @returns The last Product ID assigned.
   */
   static getLastProductId = () => {
    return ProductManager.#lastProductId;
  }

  /**
   * Increments the Last Product Id and returns the new value.
   *
   * @returns a new Product Id.
   */
  static #getNewProductId = () => {
    return ++ProductManager.#lastProductId;
  }

  /**
   * Sets a new value for the lastProductId.
   *
   * @param {int} value New value for the last product id.
   * @returns The new lastProductId value if successful, 0 otherwie.
   */
  static #setLastProductId = (value) => {
    if (value && value >= 0) {
      ProductManager.#lastProductId = value;
      return ProductManager.#lastProductId;
    }

    return 0;
  }
}
