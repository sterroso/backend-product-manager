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
    returnObject.message = 'Error: parameter "cid" must be a positive integer.';
  } else {
    const cartManager = new CartManager(cartsPath);

    const requestedCart = cartManager.getCartById(cartId);

    if (requestedCart) {
      const productManager = new ProductManager(productsPath);

      returnObject.status = "success";
      returnObject.cart = { id: requestedCart.id };
      returnObject.cart.products = requestedCart.map((cartProduct) =>
        productManager.getProductById(cartProduct.id)
      );
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

  // const { products } = req.body;

  // const productsArray = JSON.parse(products ?? []);

  const cartManager = new CartManager(cartsPath);

  const newCartId = cartManager.addCart(new Cart());

  returnObject.status = "success";
  returnObject.newCartId = newCartId;

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
    returnObject.message = 'Error: parameter "cid" must be a positive integer.';
  } else {
    if (isNaN(productId) || productId < 1 || productId % 1 !== 0) {
      returnStatus = 400;
      returnObject.status = "error";
      returnObject.message =
        'Error: parameter "pid" must be a positive integer.';
    } else {
      const cartManager = new CartManager(cartsPath);

      const existingCart = Cart.parse(cartManager.getCartById(cartId));

      if (existingCart) {
        const productManager = new ProductManager(productsPath);

        const existingProduct = productManager.getProductById(productId);

        if (existingProduct) {
          const cartItem = new CartItem(
            existingProduct.id,
            existingProduct.price
          );
          existingCart.addItem(cartItem, 1, true);
          cartManager.save();
          returnObject.status = "success";
          returnObject.newItem = { id: existingProduct.id };
          returnObject.newItem.quantity = cartItem.quantity;
          returnObject.newItem.salesPrice = cartItem.salesPrice;
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
