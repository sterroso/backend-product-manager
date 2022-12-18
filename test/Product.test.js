import test from 'node:test';
import assert from 'node:assert/strict';
import Product from '../src/Product.js';

/**
 * Requerimiento: Todos los parámetros, del constructor de Product, son obligatorios.
 *
 * Probando que se haya pasado un valor para el parámetro "title";
 */
test('should throw error when no value is provided for parameter "title".', () => {
  const expectedError = {
    name: 'Error',
    message: 'Parameter "title" is mandatory. Please provide a value for "title".'
  }

  assert.throws(() => new Product(), expectedError);
});

/**
 * Requerimiento: Todos los parámetros, del constructor de Product, son obligatorios.
 *
 * Probando que se haya pasado un valor para el parámetro "description".
 */
test('should throw Error when no value is provides for parameter "description".', () => {
  const expectedError = {
    name: 'Error',
    message: 'Parameter "description" is mandatory. Please provide a value for "description".'
  }

  assert.throws(() => new Product("title"), expectedError);
});

/**
 * Requerimiento: Todos los parámetros, del constructor de Product, son obligatorios.
 *
 * Probando que se haya pasado un valor para el parámetro "price".
 */
test('should throw Error when no value is provided for parameter "price".', () => {
  const expectedError = {
    name: 'Error',
    message: 'Parameter "price" is mandatory. Please provide a value for "price".'
  }

  assert.throws(() => new Product("title", "description"), expectedError);
});

/**
 * Requerimiento: Ninguno (deducción propia).
 *
 * Probando que el valor de precio no sea negativo.
 */
test('should throw RangeError when value for parameter "price" is negative', () => {
  const expectedError = {
    name: 'RangeError',
    message: 'Parameter "price" must have a value equal or greater than 0 (zero).'
  }

  const negativePrice = -0.25;
  const zeroPrice = 0;
  const positivePrice = 1.99;

  assert.throws(() => new Product("title", "description", negativePrice, "code", 10, []), expectedError);
  assert.doesNotThrow(() => new Product("title", "description", zeroPrice, "code", 10, []), expectedError);
  assert.doesNotThrow(() => new Product("title", "description", positivePrice, "code", 10, []), expectedError);
});

/**
 * Requerimiento: Todos los parámetros, del constructor de Product, son obligatorios.
 *
 * Probando que se haya pasado un valor para el parámetro "code".
 */
test('should throw Error when no value is provided for parameter "code".', () => {
  const expectedError = {
    name: 'Error',
    message: 'Parameter "code" is mandatory. Please provide a value for "code".'
  }

  assert.throws(() => new Product("title", "description", 1.99), expectedError);
});

/**
 * Requerimiento: Todos los parámetros, del constructor de Product, son obligatorios.
 *
 * Probando que se haya pasado un valor para el parámetro "stock".
 */
test('should throw Error when no value is provided for parameter "stock".', () => {
  const expectedError = {
    name: 'Error',
    message: 'Parameter "stock" is mandatory. Please provide a value for "stock".'
  }

  assert.throws(() => new Product("title", "description", 1.99, "code"), expectedError);
});

/**
 * Requerimiento: Ninguno (deducción propia).
 *
 * Probando que el valor de precio no sea negativo.
 */
test('should throw RangeError when value for parameter "stock" is negative.', () => {
  const expectedError = {
    name: 'RangeError',
    message: 'Parameter "stock" must have a value equal or greater than 0 (zero).'
  }

  const negativeStock = -1;
  const zeroStock = 0;
  const positiveStock = 1;

  assert.throws(() => new Product("title", "description", 1.99, "code", negativeStock), expectedError);
  assert.doesNotThrow(() => new Product("title", "description", 1.99, "code", zeroStock), expectedError);
  assert.doesNotThrow(() => new Product("title", "description", 1.99, "code", positiveStock), expectedError);
});

// La primera preentrega del proyecto final eliminó la obligatoriedad de un
// valor para el parámetro "thumbnail". Además cambió el nombre del parámetro,
// de "thumbnail" a "thumbnails", y el tipo, de string a un arreglo (Array)
// de strings.