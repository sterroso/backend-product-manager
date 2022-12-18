import CartItem from "./CartItem.js";

export default class Cart {
  #id = null;

  #items = [];

  #createdOn;

  #modifiedOn;

  constructor() {
    const creationDate = new Date(Date.now());

    this.#id = null;

    this.#items = [];

    this.#createdOn = creationDate;

    this.#modifiedOn = creationDate;
  }

  get id() {
    return this.#id;
  }

  get count() {
    return this.#items.reduce(
      (total, current) => (total += current.quantity),
      0
    );
  }

  get createdOn() {
    return this.#createdOn;
  }

  get modifiedOn() {
    return this.#modifiedOn;
  }

  addItem = (item, quantity = 1, increaseOnDuplicateCode = true) => {
    const itemAlreadyExists = this.#items.some(
      (existingItem) => existingItem.productId === item.productId
    );

    if (itemAlreadyExists) {
      if (increaseOnDuplicateCode) {
        const currentItem = this.#items.find(
          (existingItem) => existingItem.productId === item.productId
        );
        currentItem.quantity += quantity;
      } else {
        throw new Error(
          `Duplicate Item. Item with code ${item.code} already exists in the Cart.`
        );
      }
    } else {
      item.quantity = quantity;
      this.#items.push(item);
    }

    return this.count;
  };

  getItems = () => this.#items;

  getItemById = (id) => this.#items.find((item) => item.id === id);

  static parse = (object) => {
    const currentTimestamp = new Date(Date.now());
    const newCart = new Cart();
    newCart.#id = object.id;
    newCart.#createdOn = currentTimestamp;
    newCart.#modifiedOn = currentTimestamp;
    newCart.#items = object.items ?? [];

    return newCart;
  };
}
