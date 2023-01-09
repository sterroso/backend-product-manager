import CartItem from "./CartItem.js";

export default class Cart {
  #items = [];

  #createdOn;

  #modifiedOn;

  #manager;

  constructor(items) {
    const currentTimestamp = new Date(Date.now());

    if (!!items) {
      items.forEach((item) => {
        try {
          this.#items.push(CartItem.parse(item));
        } catch (err) {}
      });
    } else {
      this.#items = [];
    }

    this.#createdOn = currentTimestamp;

    this.#modifiedOn = currentTimestamp;
  }

  get createdOn() {
    return this.#createdOn;
  }

  get modifiedOn() {
    return this.#modifiedOn;
  }

  get manager() {
    return this.#manager;
  }

  get count() {
    return this.#items.reduce((count, item) => {
      count += item.quantity;
      return count;
    }, 0);
  }

  setManager = (manager) => {
    this.#manager = manager;
  };

  getItems = (limit = 0, offset = 0) => {
    if (limit < 0 || offset < 0)
      throw new Error(
        "Parameters <limit> and <offset> must be non-negative integers."
      );

    if (limit > 0) return this.#items.slice(offset, offset + limit);

    return this.#items.slice(offset);
  };

  getItemByProductId = (productId) =>
    this.#items.find((item) => item.productId === productId);

  /**
   * Adds new item into the Cart.
   *
   * @param {CartItem} item A new item to be added tot he Cart.
   */
  addItem = (item) => {
    const modifiedTimestamp = new Date(Date.now());

    const existingItem = this.#items.find(
      (cartItem) => cartItem.productId === item.productId
    );

    if (existingItem) {
      existingItem.updateQuantity(existingItem.quantity + item.quantity);
    } else {
      const newCartItem = CartItem.parse(item);
      this.#items.push(newCartItem);
    }

    this.#modifiedOn = modifiedTimestamp;

    this.manager.save();
  };

  updateItemQuantity = (productId, newQuantity) => {
    const existingItem = this.#items.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      if (existingItem.updateQuantity(newQuantity))
        this.#modifiedOn = new Date(Date.now());

      this.manager.save();

      return existingItem;
    }

    throw new Error(
      `No item with productId ${productId} was found in this Cart.`
    );
  };

  updateItemSalesPrice = (productId, newSalesPrice) => {
    const existingItem = this.#items.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      if (existingItem.updateSalesPrice(newSalesPrice))
        this.#modifiedOn = new Date(Date.now());

      this.manager.save();

      return existingItem;
    }

    throw new Error(
      `No item with productId ${productId} was found in this Cart.`
    );
  };

  getPersistObject = () => {
    const persistObject = {};

    persistObject.id = this.id;
    persistObject.createdOn = this.createdOn;
    persistObject.modifiedOn = this.modifiedOn;
    persistObject.items = [];

    this.#items.forEach((item) => {
      persistObject.items.push(item.getPersistObject());
    });

    return persistObject;
  };

  static parse = (object) => {
    const parsingTimestamp = new Date(Date.now());
    const cartItems = [];

    if (object.items && object.items.length > 0) {
      object.items.forEach((item) => {
        const newItem = CartItem.parse(item);
        cartItems.push(newItem);
      });
    }

    const newCart = new Cart(cartItems);

    newCart.id = object.id;

    if (object.createdOn) {
      newCart.#createdOn = new Date(Date.parse(object.createdOn));
    } else {
      newCart.#createdOn = parsingTimestamp;
    }

    if (object.modifiedOn) {
      newCart.#modifiedOn = new Date(Date.parse(object.modifiedOn));
    } else {
      newCart.#modifiedOn = parsingTimestamp;
    }

    return newCart;
  };
}
