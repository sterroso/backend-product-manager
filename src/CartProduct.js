import Product from "./Product.js";

export default class CartProduct extends Product {
  /**
   *
   * @param {string} title Título del producto.
   * @param {string} description Descripción del producto.
   * @param {number} price Precio del producto.
   * @param {string} code Código SKU del producto.
   * @param {number} stock Cantidad del producto disponible en el almacén.
   * @param {number} category El id de la categoría a la que pertenece el
   * producto.
   * @param {boolean} status El estatus del producto (disponible = true, false
   * de lo contrario)
   * @param {[string]} thumbnails Arreglo de cadenas de texto, cada una con un
   * URI a una imagen del producto.
   */
  constructor(
    title,
    description,
    price,
    code,
    stock,
    category,
    status = true,
    thumbnails = []
  ) {
    try {
      super(title, description, price, thumbnails, code, stock);
    } catch (err) {
      throw err;
    }

    if ((category ?? 0) === 0) {
      throw new Error(
        'Parameter "category" is mandatory. Please provide a value for "category".'
      );
    }

    if (typeof category !== "number" || category % 1 !== 0) {
      throw new Error('Parameter "category" must be a non-negative integer.');
    }

    if (category < 0) {
      throw new RangeError(
        'Parameter "category" must have a value equal or greater than 0 (zero).'
      );
    }

    this.category = category;
    this.status = status;
    this._id = -1;
  }

  /**
   * Devuelve el identificador del producto.
   */
  get id() {
    return this._id;
  }

  /**
   * Agrega una lista de cadenas de texto, cada una con una URI a una imagen
   * del producto.
   *
   * @param {[string]} uris Arreglo de cadenas de texto, cada una con un URI a
   * una imagen del producto.
   * @returns La cantidad de elementos en la propiedad "thumbnails" después de
   * agregar los nuevos URIs.
   */
  addThumbnails = (uris) => {
    if (uris.length > 0) {
      this.thumbnails = this.thumbnails.concat(uris);

      return this.thumbnails.length;
    }

    throw new Error('Parameter "uris" must have, at least, one element.');
  };

  /**
   * Quita un elemento de la lista de imágenes del producto.
   *
   * @param {int} index Índice del URI a quitar de la lista de imágenes del
   * producto.
   * @returns El elemento eliminado de la lista de imágenes del producto.
   */
  removeThumbnail = (index) => {
    if (isNaN(Number(index))) {
      throw new Error('Parameter "index" must be a non-negative integer.');
    }

    if ((index ?? -1) < 0) {
      throw new Error('Parameter "index" must be a non-negative integer.');
    }

    if (index < this.thumbnails.length) {
      const removedThumbnail = this.thumbnails.splice(index, 1);

      return removedThumbnail[0];
    }

    throw new RangeError(`Index ${index} is out of bounds.`);
  };

  /**
   * Quita todas las URI's de imágenes del producto.
   */
  clearThumnails = () => {
    this.thumbnails = [];
  };
}
