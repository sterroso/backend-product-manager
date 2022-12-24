import Cart from "./Cart.js";
import CartItem from "./CartItem.js";
import { writeFileSync, readFileSync, existsSync } from "fs";

export default class CartManager {
  static #lastCartId;

  static #defaultPersistentFilePath = "./CartManager.json";

  static #persistentFileOptions = {
    encoding: "utf-8",
  };

  #carts;

  path;

  /**
   * Creates a new CartManager instance.
   *
   * @param {string} filePath Path to the file where the CartManager's instance
   * properties (and carts) will be persisted.
   */
  constructor(filePath = null) {
    this.path = filePath ?? CartManager.#defaultPersistentFilePath;
    this.#init();
  }

  /**
   * Returns the number of carts currently contained in the CartManager.
   */
  get count() {
    return this.#carts.length;
  }

  /**
   * Returns the last id that was assigned through the addCart() method.
   */
  get lastCartId() {
    return CartManager.#lastCartId;
  }

  /**
   * Returns the next id, without modifying it, that will be assigned through
   * the addCart() method.
   *
   * Allows to "peek" the next Cart's id.
   */
  get nextCartId() {
    return CartManager.#lastCartId + 1;
  }

  get path() {
    return this.path;
  }

  /**
   * Returns an array of Products from the CartManager list (array) of
   * carts.
   *
   * @param {int} limit Max number of carts to be returned.
   * @param {int} offset Starting index of carts to be returned.
   * @returns an array of carts, starting at index limit, and ending
   * at index limit + offset.
   */
  getCarts = (limit = 0, offset = 0) => {
    if (limit < 0 || offset < 0) return [];

    if (limit > 0) {
      return this.#carts.slice(offset, offset + limit);
    }

    return this.#carts.slice(offset);
  };

  /**
   * Returns a cart, from the CartManager, whose "id" property matches
   * the value of the "id" parameter.
   *
   * @param {int} id the Cart's id.
   * @returns A cart whose id matches the value provided by the "id"
   * parameter. If no cart with such id is found, returns undefined.
   */
  getCartById = (id) => this.#carts.find((cart) => cart.id === id);

  /**
   * Adds a new Cart to the CartManager, only if the Cart's "code" does
   * not already exist in the CartManager.
   *
   * @param {Cart} cart The cart to be added to this CartManager.
   * @returns The lenght of the CartManager's array of Carts.
   */
  addCart = (cart) => {
    const newCartId = CartManager.#generateNexCartId();

    const managedCart = {
      ...cart,
      manager: this,
    };

    managedCart.id = newCartId;

    this.#carts.push(managedCart);

    this.save();

    return managedCart.id;
  };

  /**
   * Updates a cart, identified by the id provided, from the CartManager.
   *
   * @param {int} id Id property value fo the cart to be updated.
   * @param {Cart} cart The CartProduct with the new values to be
   * updated.
   * @throws {Error} if the CartManager's array of carts does not contain a
   * cart with the provided id.
   */
  updateCart = (id, cart) => {
    const cartQuery = this.#carts.find(
      (existingCart) => existingCart.id === id
    );

    if (cartQuery) {
      const originalId = cartQuery.id;

      cartQuery = { ...cart, id: originalId };

      this.save();
    }

    throw new Error(`There is no product with id ${id} in the Cart.`);
  };

  /**
   * Deletes a cart from the CartManager's array of carts, identified by
   * the id provided through the "id" parameter.
   *
   * @param {int} id Id of the cart to be deleted.
   * @returns true if the cart, with the provided id, was found and deleted,
   * false otherwise.
   */
  deleteCart = (id) => {
    const existsCart = this.#carts.some((cart) => cart.id === id);

    if (existsCart) {
      this.#carts = this.#carts.find((cart) => cart.id !== id);

      this.save();

      return true;
    }

    return false;
  };

  /**
   * Private method. Initializes the CartManager:
   *
   * Searches for the file provided through the constructor's "filePath"
   * parameter.
   *
   * If found, reads and updates theCartManager with the file's properties.
   *
   * Otherwise, initializes the CartManger's properties to default values.
   */
  #init = () => {
    if (existsSync(this.path)) {
      const fileReader = readFileSync(
        this.path,
        CartManager.#persistentFileOptions
      );

      const jsonCartManager = JSON.parse(fileReader);

      CartManager.#lastCartId = jsonCartManager.lastCartId;

      jsonCartManager.carts.forEach((cart) => {
        const newCart = Cart.parse(cart);
        newCart.manager = this;
        this.addCart(newCart);
      });
    } else {
      CartManager.#lastCartId = 0;
      this.#carts = [];
    }
  };

  /**
   * Private method. Creates a serializable object with the CartManager's
   * properties, and stringifies it to be saved (persisted) in a .json file.
   *
   * @returns A string with the CartManager's properties to be saved to a .json
   * file.
   */
  getPersistObject = () => {
    const persistObject = {};

    persistObject.lastCartId = CartManager.#lastCartId;

    persistObject.carts = [];

    this.#carts.forEach((cart) => {
      const newCart = Cart.parse(cart);
      persistObject.carts.push(newCart.getPersistObject());
    });

    return persistObject;
  };

  /**
   * Private method. Saves, to a .json file, an object with the CartManager's
   * properties.
   */
  save = () => {
    const managerString = JSON.stringify(this.getPersistObject());

    writeFileSync(this.path, managerString, CartManager.#persistentFileOptions);
  };

  /**
   * Static private method. Modifies and returns a new CartProduct Id.
   *
   * @returns A new CartProduct id.
   */
  static #generateNexCartId = () => ++CartManager.#lastCartId;
}
