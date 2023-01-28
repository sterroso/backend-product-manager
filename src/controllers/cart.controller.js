import * as CartProvider from "../dao/cart.mongo-dao.js";
import { getProduct } from "../dao/product.mongo-dao.js";
import { StatusCode, StatusString } from "../constants/constants.js";
import sanitize from "mongo-sanitize";

export const getCarts = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  try {
    const carts = await CartProvider.getCarts();

    if (carts.length === 0) {
      returnStatus = StatusCode.CLIENT_ERROR.NOT_FOUND;
      returnObject.status = StatusString.EMPTY_RESULTSET;
    } else {
      returnObject.status = StatusString.SUCCESS;
      returnObject.carts = carts;
    }
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;
    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const getCart = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { cartId } = req.params;

  try {
    const cart = await CartProvider.getCart(cartId);

    if (!cart) {
      returnStatus = StatusCode.CLIENT_ERROR.NOT_FOUND;
      returnObject.status = StatusString.EMPTY_RESULTSET;
    } else {
      returnObject.status = StatusString.SUCCESS;
      returnObject.cart = cart;
    }
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;
    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const createCart = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.CREATED;

  try {
    const newCart = await CartProvider.createCart();

    if (!newCart) {
      returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;
      returnObject.status = StatusString.ERROR;
      returnObject.error = "Cart could not be created.";
    }
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;
    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const updateCart = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { cartId } = req.params;

  const { cartItems } = req.body;

  if (!cartItems || cartItems.length < 1) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;
    returnObject.status = StatusString.ERROR;
    returnObject.error = "Provide an array with, at least, one cart item.";
  } else {
    try {
      const updatedCart = await CartProvider.updateCart(cartId, cartItems);

      if (!updatedCart) {
        returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;
        returnObject.status = StatusString.ERROR;
        returnObject.error = "Cart could not be updated.";
      } else {
        returnObject.status = StatusString.SUCCESS;
        returnObject.payload = updatedCart;
      }
    } catch (error) {
      returnStatus = StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR;
      returnObject.status = StatusString.ERROR;
      returnObject.error = error.message;
    }
  }

  res.status(returnStatus).json(returnObject).end();
};

export const deleteCart = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { cartId } = req.params;

  try {
    const deleteMessage = await CartProvider.deleteCart(cartId);

    returnObject.status = StatusString.DELETED;
    returnObject.message = deleteMessage;
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;
    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const addCartItem = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.CREATED;

  const { cartId, productId } = req.params;

  try {
    const existingProduct = await getProduct(productId);

    if (!existingProduct) {
      returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

      returnObject.status = StatusString.ERROR;
      returnObject.error = `No product with id "${productId}" was found.`;
    } else {
      const productItem = {
        productId,
        salesPrice: existingProduct.price,
        quantity: 1,
      };

      const updatedCart = await CartProvider.addCartItem(cartId, productItem);

      returnObject.status = StatusString.SUCCESS;
      returnObject.cart = updatedCart;
    }
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const updateCartItem = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { cartId, productId } = req.params;

  const { quantity, salesPrice } = req.body;

  const productItem = {
    productId,
  };

  if (quantity) {
    productItem.quantity = sanitize(quantity);
  }

  if (salesPrice) {
    productItem.salesPrice = sanitize(salesPrice);
  }

  try {
    const updatedProduct = await CartProvider.updateCartItem(
      cartId,
      productItem
    );

    if (!updatedProduct) {
      returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;
      returnObject.status = StatusString.ERROR;
      returnObject.error = "Object not updated.";
    } else {
      returnObject.status = StatusString.SUCCESS;
      returnObject.payload = updatedProduct;
    }
  } catch (error) {
    returnStatus = StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR;
    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }
  res.status(returnStatus).json(returnObject).end();
};

export const deleteCartItem = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { cartId, productId } = req.params;

  try {
    const deleteConfirmation = await CartProvider.deleteCartItem(
      cartId,
      productId
    );

    if (!deleteConfirmation) {
      returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

      (returnObject.status = StatusString.ERROR),
        (returnObject.error = "Cart item could not be deleted.");
    }
  } catch (error) {
    returnStatus = StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const clearCartItems = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { cartId } = req.params;

  if (!cartId) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.ERROR;
    returnObject.error = "cartId parameter not provided.";
  } else {
    try {
      const clearedCart = await CartProvider.clearCartItems(sanitize(cartId));

      returnObject.status = StatusString.SUCCESS;
      returnObject.payload = clearedCart;
    } catch (error) {
      returnStatus = StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR;

      returnObject.status = StatusString.ERROR;
      returnObject.error = error.message;
    }
  }

  res.status(returnStatus).json(returnObject).end();
};
