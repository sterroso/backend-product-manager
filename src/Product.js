export default class Product{
  /**
   * Crea una instancia nueva de producto especificando el título,
   * descripción, precio, URL de su imagen, código SKU, y stock
   * disponible en el almacén.
   *
   * @param {string} title - Título del producto.
   * @param {string} description - Descripción del producto.
   * @param {Number} price - Precio del producto (debe ser mayo o igual a cero).
   * @param {string} thumbnail - URL a la imagen del producto.
   * @param {string} code - Código SKU del producto.
   * @param {Number} stock - Cantidad del producto disponible en el almacén.
   */
   constructor(title, description, price, thumbnail, code, stock) {
    if ((title ?? 'empty') === 'empty') {
      throw new Error('Parameter "title" is mandatory. Please provide a value for "title".');
    }

    if ((description ?? 'empty') === 'empty') {
      throw new Error('Parameter "description" is mandatory. Please provide a value for "description".');
    }

    if ((price ?? 'empty') === 'empty') {
      throw new Error('Parameter "price" is mandatory. Please provide a value for "price".');
    }

    if (price < 0) {
      throw new RangeError('Parameter "price" must have a value equal or greater to 0 (zero).');
    }

    if ((thumbnail ?? 'empty') === 'empty') {
      throw new Error('Parameter "thumbnail" is mandatory. Please provide a value for "thumbnail".');
    }

    if ((code ?? 'empty') === 'empty') {
      throw new Error('Parameter "code" is mandatory. Please provide a value for "code".');
    }

    if ((stock ?? 'empty') === 'empty') {
      throw new Error('Parameter "stock" is mandatory. Please provide a value for "stock".');
    }

    if (stock < 0) {
      throw new Error('Parameter "stock" must have a value equal or greater to 0 (zero).');
    }

    this.title = title.trim();
    this.description = description.trim();
    this.price = price;
    this.thumbnail = thumbnail.trim();
    this.code = code.trim().toUpperCase();
    this.stock = stock;
  }
}