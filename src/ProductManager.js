class Product {
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
};

class ProductManager {
  static #lastProductId;

  #products = [];

  constructor() {
  }

  /**
   * Agrega un producto a la colección de productos. Si el producto pasado
   * mediante el parámetro product, tiene un código repetido, éste no se
   * agregará a la colección.
   *
   * Si se agrega exitosamente el producto a la colección, devuelve el id
   * asignado, de lo contrario devuelve -1 (uno negativo).
   *
   * @param {Product} product - El producto que va a agregarse a la colección.
   */
  addProduct = (product) => {
    if(!this.#products.some(p => p.code === product.code)) {
      product.id = ProductManager.#getLastProductId();

      this.#products.push(product);

      // Devuelve el id del nuevo producto como indicador que la
      // operación fue exitosa.
      return product.id;
    }

    throw new Error(`There is already a product with code ${product.code}.`);
  }

  /**
   *
   * @returns Devuelve la colección de productos.
   */
  getProducts = () => {
    return this.#products;
  }

  /**
   * Busca un producto específico en la colección de productos mediante
   * su identificador (campo id). Si lo encuentra, devuelve el producto,
   * de lo contrario devuelve indefinido (undefined).
   *
   * @param {int} productId - El identificador del producto buscado.
   * @returns El producto (Object) cuyo id coincide con el argumento
   * pasado mediante el parámetro productId.
   */
  getProductById = (productId) => {
    const foundProduct = this.#products.find(product => product.id === productId);

    if (foundProduct) return foundProduct;

    throw new Error(`Product with id ${productId} was not found.`);
  }

  getProductByCode = (productCode) => {
    const foundProduct = this.#products.find(product => product.code === productCode.trim().toUpperCase());

    if (foundProduct) return foundProduct;

    throw new Error(`Product with code ${productCode} was not found.`);
  }

  /**
   * Allows to peek to the next product id to be assigned.
   *
   * @returns The next id that will be assigned to a product successfully added.
   */
  static peekNextId = () => {
    if (!ProductManager.#lastProductId) {
      return 1;
    }

    return ProductManager.#lastProductId + 1;
  }

  /**
   * Increments the last Product ID and returns its new value by 1 (one).
   *
   * @returns The last Product ID inserted, plus 1 (one).
   */
  static #getLastProductId = () => {
    if (!ProductManager.#lastProductId) {
      ProductManager.#lastProductId = 0;
    }

    return ++ProductManager.#lastProductId;
  }
}

// Se creará una instancia de la clase “ProductManager”
const productManager = new ProductManager();
if (productManager) {
  console.log('New ProductManager instance has been created.');
}

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log('getProducts()', productManager.getProducts());

/**
 * Se llamará al método “addProduct” con los campos:
 * title: “producto prueba”
 * description:”Este es un producto prueba”
 * price:200,
 * thumbnail:”Sin imagen”
 * code:”abc123”,
 * stock:25
 */
console.log('addProduct()',
  productManager.addProduct(
    new Product(
      "producto prueba",
      "Este es un producto prueba",
      200,
      "Sin imagen",
      "abc123",
      25
    )
  )
);

// El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
console.log('addProduct()',
  productManager.addProduct(
    new Product(
      "producto prueba 2",
      "Este es un producto prueba 2",
      199.99,
      "Sin imagen",
      "abc1234",
      666
    )
  )
);

console.log('addProduct()',
  productManager.addProduct(
    new Product(
      "producto prueba 3",
      "Este es un producto prueba 3",
      198.99,
      "Sin imagen",
      "abc12345",
      42
    )
  )
);

console.log('addProduct()',
  productManager.addProduct(
    new Product(
      "producto prueba 4",
      "Este es un producto prueba 4",
      420,
      "Sin imagen",
      "abc123456",
      69
    )
  )
);

// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log('getProducts()', productManager.getProducts());

// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
try {
  console.log('addProduct()',
    productManager.addProduct(
      new Product(
        "producto prueba",
        "Este es un producto prueba",
        200,
        "Sin imagen",
        "abc123",
        25
      )
    )
  );
} catch (err) {
  console.error(err);
}

// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
try {
  console.log('getProductById(1)', productManager.getProductById(1));
  console.log('getProductById(100)', productManager.getProductById(100));  // Debe devolver un error.
} catch (err) {
  console.error(err);
}
