import { Router } from "express";
import CartManager from "../CartManager.js";
import Cart from "../Cart.js";
import CartItem from "../CartItem.js";
import ProductManager from "../ProductManager.js";
import Product from "../Product.js";

const cartsPath = "public/carrito.json";
const productsPath = "public/productos.json";

const CartsRouter = Router();

CartsRouter.get("/:cid", (req, res) => {
  const returnObject = {};
  let returnStatus = 200;

  const { cid } = req.params;
  const cartId = Number(cid ?? 0);

  if (isNaN(cartId) || cartId < 1 || cartId % 1 !== 0) {
    returnStatus = 400;
    returnObject.status = "error";
    returnObject.message = "Error: parameter <cid> must be a positive integer.";
  } else {
    const cartManager = new CartManager(cartsPath);

    const requestedCart = cartManager.getCartById(cartId);

    if (requestedCart) {
      const productManager = new ProductManager(productsPath);

      returnObject.status = "success";
      returnObject.cart = requestedCart.getPersistObject();
    } else {
      returnStatus = 400;
      returnObject.status = "error";
      returnObject.message = `Error: No cart with id ${cartId} was found.`;
    }
  }

  res.status(returnStatus).json(returnObject).end();
});

CartsRouter.post("/", (req, res) => {
  const returnObject = {};
  let returnStatus = 201;

  const cartManager = new CartManager(cartsPath);

  const newCartId = cartManager.addCart(new Cart());

  const newCart = cartManager.getCartById(newCartId);

  returnObject.status = "success";
  returnObject.cart = newCart.getPersistObject();

  res.status(returnStatus).json(returnObject).end();
});

CartsRouter.post("/:cid/product/:pid", (req, res) => {
  const returnObject = {};
  let returnStatus = 200;

  const { cid, pid } = req.params;

  const cartId = Number(cid ?? 0);

  const productId = Number(pid ?? 0);

  if (isNaN(cartId) || cartId < 0 || cartId % 1 !== 0) {
    returnStatus = 400;
    returnObject.status = "error";
    returnObject.message = "Error: parameter <cid> must be a positive integer.";
  } else {
    if (isNaN(productId) || productId < 1 || productId % 1 !== 0) {
      returnStatus = 400;
      returnObject.status = "error";
      returnObject.message =
        "Error: parameter <pid> must be a positive integer.";
    } else {
      const cartManager = new CartManager(cartsPath);

      const existingCart = cartManager.getCartById(cartId);

      if (existingCart) {
        const productManager = new ProductManager(productsPath);

        const existingProduct = productManager.getProductById(productId);

        if (existingProduct) {
          const cartItem = new CartItem(
            existingProduct.id,
            existingProduct.price,
            CartItem.defaultItemQuantity
          );
          existingCart.addItem(cartItem);
          cartManager.save();
          returnObject.status = "success";
          returnObject.newItem = cartItem.getPersistObject();
        } else {
          returnStatus = 400;
          returnObject.status = "error";
          returnObject.message = `Error: No product with id ${productId} was found.`;
        }
      } else {
        returnStatus = 400;
        returnObject.status = "error";
        returnObject.message = `Error: No cart with id ${cartId} was found.`;
      }
    }
  }

  res.status(returnStatus).json(returnObject).end();
});

export default CartsRouter;
