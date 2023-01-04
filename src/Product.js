export default class Product {
  /**
   * Crea una instancia nueva de producto especificando el título,
   * descripción, precio, URL de su imagen, código SKU, y stock
   * disponible en el almacén.
   *
   * @param {string} title - Título del producto.
   * @param {string} description - Descripción del producto.
   * @param {string} code - Código SKU del producto.
   * @param {number} price - Precio del producto (debe ser mayo o igual a cero)
   * @param {number} stock - Cantidad del producto disponible en el almacén.
   * @param {string} category - Categoría del producto.
   * @param {boolean} status - Estado del producto.
   * @param {[string]} thumbnails - Un arreglo de strings con URIs a las
   * imágenes del producto.
   */
  constructor(
    title,
    description,
    code,
    price,
    stock,
    category,
    status = true,
    thumbnails = []
  ) {
    if ((title ?? "empty") === "empty") {
      throw new Error('Parameter "title" is mandatory.');
    }

    if ((description ?? "empty") === "empty") {
      throw new Error('Parameter "description" is mandatory.');
    }

    if ((price ?? "empty") === "empty") {
      throw new Error('Parameter "price" is mandatory.');
    }

    if (price < 0) {
      throw new RangeError(
        'Parameter "price" must have a value equal or greater than 0 (zero).'
      );
    }

    if ((code ?? "empty") === "empty") {
      throw new Error('Parameter "code" is mandatory.');
    }

    if ((stock ?? "empty") === "empty") {
      throw new Error('Parameter "stock" is mandatory.');
    }

    if (stock < 0) {
      throw new RangeError(
        'Parameter "stock" must have a value equal or greater than 0 (zero).'
      );
    }

    if ((category ?? "empty") === "empty") {
      throw new Error('Parameter "category" is mandatory.');
    }

    this.title = title.trim();
    this.description = description.trim();
    this.code = code.trim().toUpperCase();
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.status = status;
    this.thumbnails = thumbnails;
  }
}
