import CartItem from "./CartItem.js";
import CartManager from "./CartManager.js";

export default class Cart {
  #items = [];

  #manager;

  #createdOn;

  #modifiedOn;

  constructor() {
    const creationDate = new Date(Date.now());

    this.#items = [];

    this.#createdOn = creationDate;

    this.#modifiedOn = creationDate;
  }

  get count() {
    return this.#items.reduce(
      (total, current) => (total += current.quantity),
      0
    );
  }

  get modifiedOn() {
    return this.#modifiedOn;
  }

  get createdOn() {
    return this.#createdOn;
  }

  get manager() {
    return this.#manager;
  }

  set manager(object) {
    if (object instanceof CartManager) {
      this.#manager = object;
    }
  }

  getItems = () => this.#items;

  /**
   * Adds a new product descriptor (id, sales price and quantity) to this Cart.
   *
   * @param {CartItem} item A new item to be added to the Cart.
   * @param {boolean} increaseOnDuplicateProductId If true (default), item's
   * quantity will be increased when a duplicate item's product id is found in
   * this Cart.
   * @returns The total count, for the provided item id, in the Cart after
   * adding or increaing its quantity.
   * @throws {Error} if the item's product id is already on this Cart and the
   * value of parameter increaseOnDuplicateProductId is false.
   */
  addItem = (item, increaseOnDuplicateProductId = true) => {
    const itemAlreadyExists = this.#items.some(
      (existingItem) => existingItem.productId === item.productId
    );

    if (itemAlreadyExists) {
      if (increaseOnDuplicateProductId) {
        const currentItem = this.#items.find(
          (existingItem) => existingItem.productId === item.productId
        );

        currentItem.quantity += item.quantity;

        this.manager.save();

        return currentItem.quantity;
      } else {
        throw new Error(
          `Duplicate Item. Item with code ${item.code} already exists in the Cart.`
        );
      }
    } else {
      this.#items.push(item);

      this.manager.save();

      return item.quantity;
    }
  };

  getItemById = (id) => this.#items.find((item) => item.id === id);

  static parse = (object) => {
    const newCart = new Cart();

    newCart.#createdOn = object.createdOn;
    newCart.#modifiedOn = object.modifiedOn;

    if (object.items) {
      object.items.forEach((item) => newCart.addItem(CartItem.parse(item)));
    } else {
      newCart.#items = [];
    }

    return newCart;
  };

  getPersistObject = () => {
    const persistObject = {};
    persistObject.id = this.id;
    persistObject.createdOn = this.createdOn;
    persistObject.modifiedOn = this.modifiedOn;
    persistObject.items = [];

    this.#items.forEach((item) => {
      const newItem = CartItem.parse(item);
      persistObject.items.push(newItem.getPersistObject());
    });

    return persistObject;
  };
}
