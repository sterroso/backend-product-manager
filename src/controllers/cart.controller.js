import * as CartProvider from "../dao/cart.mongo-dao.js";
import { getProduct } from "../dao/product.mongo-dao.js";
import { StatusCode, StatusString } from "../constants/constants.js";

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
  const returnObject = {
    status: "Error",
    error: "Method not implemented yet.",
  };
  let returnStatus = StatusCode.SERVER_ERROR.NOT_IMPLEMENTED;

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
  const returnObject = {
    status: "Error",
    error: "Method not implemented yet.",
  };
  let returnStatus = StatusCode.SERVER_ERROR.NOT_IMPLEMENTED;

  res.status(returnStatus).json(returnObject).end();
};

export const deleteCartItem = async (req, res) => {
  const returnObject = {
    status: "Error",
    error: "Method not implemented yet.",
  };
  let returnStatus = StatusCode.SERVER_ERROR.NOT_IMPLEMENTED;

  res.status(returnStatus).json(returnObject).end();
};

export const clearCartItems = async (req, res) => {
  const returnObject = {
    status: "Error",
    error: "Method not implemented yet.",
  };
  let returnStatus = StatusCode.SERVER_ERROR.NOT_IMPLEMENTED;

  res.status(returnStatus).json(returnObject).end();
};
