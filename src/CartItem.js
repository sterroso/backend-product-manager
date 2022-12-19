export default class CartItem {
  /**
   *
   * @param {number} productId Id del producto al que está ligado el artículo.
   * @param {number} salesPrice Precio de venta del artículo.
   * @param {number} quantity Cantidad del artículo disponible en el almacén.
   */
  constructor(productId, salesPrice, quantity = 1) {
    this.productId = productId;
    this.salesPrice = salesPrice;
    this.quantity = quantity;
  }

  getPersistObject = () => {
    const persistObject = {};
    persistObject.productId = this.productId;
    persistObject.salesPrice = this.salesPrice;
    persistObject.quantity = this.quantity;

    return this.persistObject;
  }

  static parse = (object) => {
    const newCartItem = new CartItem(
      object.productId,
      object.salesPrice,
      object.quantity
    );

    return newCartItem;
  };
}
