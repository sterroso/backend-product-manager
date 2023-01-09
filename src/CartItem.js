export default class CartItem {
  #productId;

  #salesPrice;

  #quantity;

  #createdOn;

  #modifiedOn;

  static defaultItemPrice = 0.0;

  static defaultItemQuantity = 1;

  /**
   * Creates a new instance of CartItem. to be added to a shopping Cart.
   *
   * @param {number} productId Product's Id.
   * @param {number} salesPrice Product's sales price.
   * @param {number} quantity Product's quantity in tht Cart.
   */
  constructor(
    productId,
    salesPrice = CartItem.defaultItemPrice,
    quantity = CartItem.defaultItemQuantity
  ) {
    const currentTimestamp = new Date(Date.now());
    this.#productId = productId;
    this.#salesPrice = salesPrice;
    this.#quantity = quantity;
    this.#createdOn = currentTimestamp;
    this.#modifiedOn = currentTimestamp;
  }

  get productId() {
    return this.#productId;
  }

  get salesPrice() {
    return this.#salesPrice;
  }

  get quantity() {
    return this.#quantity;
  }

  get createdOn() {
    return this.#createdOn;
  }

  get modifiedOn() {
    return this.#modifiedOn;
  }

  updateQuantity = (newQuantity) => {
    if (!!newQuantity && newQuantity >= 0) {
      const modifiedTimesTamp = new Date(Date.now());

      this.#quantity = newQuantity;

      this.#modifiedOn = modifiedTimesTamp;

      return true;
    }

    return false;
  };

  updateSalesPrice = (newSalesPrice) => {
    if (!!newSalesPrice && newSalesPrice >= 0) {
      const modifiedTimesTamp = new Date(Date.now());

      this.#salesPrice = newSalesPrice;

      this.#modifiedOn = modifiedTimesTamp;

      return true;
    }

    return false;
  };

  getPersistObject = () => {
    const persisObject = {};

    persisObject.productId = this.productId;
    persisObject.salesPrice = this.salesPrice;
    persisObject.quantity = this.quantity;
    persisObject.createdOn = this.createdOn;
    persisObject.modifiedOn = this.modifiedOn;

    return persisObject;
  };

  static parse = (object) => {
    const newCartItem = new CartItem(
      object.productId,
      object.salesPrice ?? CartItem.defaultItemPrice,
      object.quantity ?? CartItem.defaultItemQuantity
    );

    const parseTimestamp = new Date(Date.now());

    newCartItem.#createdOn = object.createdOn ?? parseTimestamp;
    newCartItem.#modifiedOn = object.modifiedOn ?? parseTimestamp;

    return newCartItem;
  };
}
