import { writeFileSync, readFileSync, existsSync } from "fs";
import Cart from "./Cart.js";
import CartItem from "./CartItem.js";

export default class CartManager {
  static #lastCartId;

  static #defaultPersistFilePath = "./CartManager.json";

  static #persistFileOptions = {
    encoding: "utf-8",
  };

  #carts = [];

  #path = "";

  /**
   * Creates a new instance of CartManager.
   *
   * @param {string} persistFilePath Path to the file where carts will be
   * stored.
   */
  constructor(persistFilePath) {
    this.#path = persistFilePath ?? CartManager.#defaultPersistFilePath;
    this.#init();
  }

  get count() {
    return this.#carts.length;
  }

  get nextCartId() {
    return CartManager.#lastCartId + 1;
  }

  get lastProductId() {
    return CartManager.#lastCartId;
  }

  getCarts = (limit = 0, offset = 0) => {
    // Si cualquiera de los parámetros tiene un valor negativo (inválido)
    if (limit < 0 || offset < 0)
      throw new Error(
        "Parameters <limit> and <offset> must be non-negative integers."
      );

    // Si el parámetro limit tiene un valor positivo
    if (limit > 0) return this.#carts.slice(offset, offset + limit);

    return this.#carts.slice(offset);
  };

  /**
   * Finds a Cart with the specified id.
   *
   * @param {number} cartId Required Cart's id.
   * @returns a Cart whose id matches the parameter cartId.
   */
  getCartById = (cartId) => this.#carts.find((cart) => cart.id === cartId);

  addCart = (newCart) => {
    newCart.id = CartManager.#generateNextCartId();
    newCart.setManager(this);

    this.#carts.push(newCart);

    this.save();

    return newCart.id;
  };

  updateCart = (cartId, newCartProperties) => {
    const existsCart = this.#carts.find((cart) => cart.id === cartId);

    if (existsCart) {
      existsCart.setManager(this);

      existsCart.createdOn =
        newCartProperties.createdOn ?? existsCart.createdOn;

      existsCart.modifiedOn =
        newCartProperties.modifiedOn ?? existsCart.modifiedOn;

      const newCartItems = newCartProperties.getItems();

      if (newCartItems && newCartItems.length > 0) {
        existsCart.clearItems();

        newCartItems.forEach((item) => {
          const newCartItem = CartItem.parse(item);
          existsCart.addItem(newCartItem, false);
        });
      }

      this.save();

      return existsCart;
    } else {
      return false;
    }
  };

  removeCart = (cartId) => {
    this.#carts = this.#carts.filter((cart) => cart.id !== cartId);

    this.save();
  };

  clearCarts = () => {
    this.#carts = [];

    this.save();
  };

  save = () => {
    const persistCartManager = JSON.stringify(this.getPersistObject());

    writeFileSync(
      this.#path,
      persistCartManager,
      CartManager.#persistFileOptions
    );
  };

  getPersistObject = () => {
    const persistObject = {};
    persistObject.lastCartId = CartManager.#lastCartId;
    persistObject.carts = [];

    this.#carts.forEach((cart) => {
      persistObject.carts.push(cart.getPersistObject());
    });

    return persistObject;
  };

  #init = () => {
    if (existsSync(this.#path)) {
      const fileReader = readFileSync(
        this.#path,
        CartManager.#persistFileOptions
      );

      const persistedCartManager = JSON.parse(fileReader);

      CartManager.#lastCartId = persistedCartManager.lastCartId;

      persistedCartManager.carts.forEach((cart) => {
        const newCart = Cart.parse(cart);
        newCart.setManager(this);
        this.#carts.push(newCart);
      });
    } else {
      CartManager.#lastCartId = 0;
      this.#carts = [];
    }
  };

  static #generateNextCartId = () => ++CartManager.#lastCartId;
}
