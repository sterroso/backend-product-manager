import test from "node:test";
import assert from "node:assert/strict";
import CartProduct from "../src/CartProduct.js";

/**
 * Requerimiento: Todos los parámetros del constructor son obligatorios, a
 * excepción de thumbnails. Status es true por defecto.
 *
 * Al intentar instanciar un CartProduct, sin un valor para el parámetro
 * "title", debe arrojar un error.
 */
test("should throw an Error by calling constructor without title", () => {
  const expectedError = {
    name: "Error",
    message:
      'Parameter "title" is mandatory. Please provide a value for "title".',
  };

  assert.throws(
    () => new CartProduct(),
    expectedError,
    "Error expected, by calling constructor without title, was not thrown."
  );
});

/**
 * Requerimiento: Todos los parámetros del constructor son obligatorios, a
 * excepción de thumbnails. Status es true por defecto.
 *
 * Al intentar instanciar un CartProduct, sin un valor para el parámetro
 * "description", debe arrojar un error.
 */
test("should throw an Error by calling constructor without description", () => {
  const expectedError = {
    name: "Error",
    message:
      'Parameter "description" is mandatory. Please provide a value for "description".',
  };

  assert.throws(
    () => new CartProduct("title"),
    expectedError,
    "Error expected, by calling constructor without description, was not thrown."
  );
});

/**
 * Requerimiento: Todos los parámetros del constructor son obligatorios, a
 * excepción de thumbnails. Status es true por defecto.
 *
 * Al intentar instanciar un CartProduct, sin un valor para el parámetro
 * "price", debe arrojar un error.
 *
 * También se prueba que no acepte valores negativos para el parámetro
 * "price".
 */
test("should throw an Error by calling constructor without price", () => {
  const expectedError = {
    name: "Error",
    message:
      'Parameter "price" is mandatory. Please provide a value for "price".',
  };

  assert.throws(
    () => new CartProduct("title", "description"),
    expectedError,
    "Error expected, by calling constructor without price, was not thrown."
  );

  const negativePriceExpectedError = {
    name: "RangeError",
    message:
      'Parameter "price" must have a value equal or greater than 0 (zero).',
  };

  assert.throws(
    () => new CartProduct("title", "description", -0.001),
    negativePriceExpectedError,
    "Error expected, by calling constructor with a negative price, was not thrown."
  );
});

/**
 * Requerimiento: Todos los parámetros del constructor son obligatorios, a
 * excepción de thumbnails. Status es true por defecto.
 *
 * Al intentar instanciar un CartProduct, sin un valor para el parámetro
 * "code", debe arrojar un error.
 */
test("should throw an Error by calling constructor without code", () => {
  const expectedError = {
    name: "Error",
    message:
      'Parameter "code" is mandatory. Please provide a value for "code".',
  };

  assert.throws(
    () => new CartProduct("title", "description", 200),
    expectedError,
    "Error expected, by calling constructor without code, was not thrown."
  );
});

/**
 * Requerimiento: Todos los parámetros del constructor son obligatorios, a
 * excepción de thumbnails. Status es true por defecto.
 *
 * Al intentar instanciar un CartProduct, sin un valor para el parámetro
 * "stock", debe arrojar un error.
 *
 * También se prueba que no acepte valores negativos para el parámetro
 * "stock".
 */
test("should throw an Error by calling constructor without stock", () => {
  const expectedError = {
    name: "Error",
    message:
      'Parameter "stock" is mandatory. Please provide a value for "stock".',
  };

  assert.throws(
    () => new CartProduct("title", "description", 200, "123abc"),
    expectedError,
    "Error expected, by calling constructor without stock, was not thrown."
  );

  const negativeStockExpectedError = {
    name: "RangeError",
    message:
      'Parameter "stock" must have a value equal or greater than 0 (zero).',
  };

  assert.throws(
    () => new CartProduct("title", "description", 200, "123abc", -1),
    negativeStockExpectedError,
    "Error expected, by calling constructor with a negative stock, was not thrown."
  );
});

/**
 * Requerimiento: Todos los parámetros del constructor son obligatorios, a
 * excepción de thumbnails. Status es true por defecto.
 *
 * Al intentar instanciar un CartProduct, sin un valor para el parámetro
 * "category", debe arrojar un error.
 *
 * También se prueba que sólo acepte enteros no negativos para el parámetro
 * "category" (enteros mayores o iguales a 0).
 */
test("should throw an Error by calling constructor without category", () => {
  const expectedError = {
    name: "Error",
    message:
      'Parameter "category" is mandatory. Please provide a value for "category".',
  };

  assert.throws(
    () => new CartProduct("title", "description", 200, "123abc", 25),
    expectedError,
    "Error expected, by calling constructor without category, was not thrown."
  );

  const expectedNonIntegerCategoryError = {
    name: "Error",
    message: 'Parameter "category" must be a non-negative integer.',
  };

  assert.throws(
    () => new CartProduct("title", "description", 200, "123abc", 25, true),
    expectedNonIntegerCategoryError,
    'Error expected, by calling constructor with a boolean-type value for paramter "category", was not thrown.'
  );

  assert.throws(
    () => new CartProduct("title", "description", 200, "123abc", 25, "foo"),
    expectedNonIntegerCategoryError,
    'Error expected, by calling constructor with a string-type value for paramter "category", was not thrown.'
  );

  assert.throws(
    () =>
      new CartProduct("title", "description", 200, "123abc", 25, {
        key: "value",
      }),
    expectedNonIntegerCategoryError,
    'Error expected, by calling constructor with an object-type value for paramter "category", was not thrown.'
  );

  assert.throws(
    () =>
      new CartProduct(
        "title",
        "description",
        200,
        "123abc",
        25,
        undeclaredVariable
      ),
    expectedNonIntegerCategoryError,
    'Error expected, by calling constructor with an undefined-type value for paramter "category", was not thrown.'
  );

  assert.throws(
    () => new CartProduct("title", "description", 200, "123abc", 25, 2.0125),
    expectedNonIntegerCategoryError,
    'Error expected, by calling constructor with a non integer type value for paramter "category", was not thrown.'
  );

  assert.throws(
    () => new CartProduct("title", "description", 200, "123abc", 25, -0.0125),
    expectedNonIntegerCategoryError,
    'Error expected, by calling constructor with a negative non integer type value for paramter "category", was not thrown.'
  );

  const expectedNegativeCategoryError = {
    name: "RangeError",
    message:
      'Parameter "category" must have a value equal or greater than 0 (zero).',
  };

  assert.throws(
    () => new CartProduct("title", "description", 200, "123abc", 25, -1),
    expectedNegativeCategoryError,
    'Error expected, by calling constructor with a negative value for paramter "category", was not thrown.'
  );
});

/**
 * Requerimiento: Todos los parámetros del constructor son obligatorios, a
 * excepción de thumbnails. Status es true por defecto.
 *
 * Al instanciar un objeto de la clase CartProduct, sin proporcionar un valor
 * para los parámetros "thumbnails" o "status", no debe arrojar error. Además,
 * en la instancia resultante, el valor de la propiedad "status" debe ser true
 * (verdadero) y la propiedad "thumbnails" debe ser un arreglo vacío, cuando
 * no se pasen valores de sus parámetros correspondientes en el constructor.
 */
test('should create successfully a new instance of CartProduct when no values are passed for "satus" and "thumbnail" parameters.', () => {
  const unexpectedError = {
    name: /Error/i,
  };

  assert.doesNotThrow(
    () => new CartProduct("title", "description", 200, "123abc", 25, 0),
    unexpectedError,
    'Unexpected error thrown when no values were passed to "status" and "thumbnails" parameters.'
  );

  const defaultObject = new CartProduct(
    "title",
    "description",
    200,
    "123abc",
    25,
    0
  );

  assert.strictEqual(
    defaultObject.thumbnails.length,
    0,
    'Default "thumbnails" property value is not an empty Array.'
  );

  assert.strictEqual(
    defaultObject.status,
    true,
    'Default "status" property value is not true.'
  );
});
