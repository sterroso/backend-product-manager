import { Router } from "express";
// eslint-disable-next-line no-unused-vars
import swaggerJSDoc from "swagger-jsdoc";
import * as CartController from "../controllers/cart.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/carts:
 *   get:
 *     summary: Gets all carts.
 *     description: Retrieves a list of all carts. Might also include parameters for querying or sorting options.
 *     responses:
 *       200:
 *         description: Successfully retrieved a list of carts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Cart'
 *       400:
 *         description: One or more parameters' values (querying or sorting options) might not be valid.
 *       404:
 *         description: No carts were found.
 *       500:
 *         description: Unidentified server-side error.
 *
 */
router.get("/", CartController.getCarts);

/**
 * @swagger
 * /api/carts/{cartId}:
 *   get:
 *     summary: Gets a single cart identified by its Id.
 *     description: Retrieves a cart identified by its Id.
 *     responses:
 *       200:
 *         description: Successfully retrieved a cart identified by its Id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Cart
 *       400:
 *         description: The Id parameter's value might not be valid.
 *       404:
 *         description: No cart with the specified Id was found.
 *       500:
 *         description: Unidentified server-side error.
 */
router.get("/:cartId", CartController.getCartById);

/**
 * @swagger
 * /api/carts/{cartId}:
 *   put:
 *     summary: Updates a specific cart.
 *     description: Updates a cart's content, identified by its Id (cartId).
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         description: Cart's Id.
 *         schema:
 *           $type: String
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/requestBodies/updateCart'
 *     responses:
 *       200:
 *         description: The specified cart was successfully updated.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Cart'
 *       400:
 *         description: The cartId parameter's value might not be valid.
 *       401:
 *         description: User is not authenticated.
 *       403:
 *         description: User is not allowed to perform this operation.
 *       404:
 *         description: The cart specified was not found.
 *       500:
 *         description: Unidentified server-side error.
 */
router.put("/:cartId", auth, CartController.updateCart);

/**
 * @swagger
 * /api/carts/{cartId}:
 *   delete:
 *     summary: Clears out a cart's items.
 *     description: Removes all cart-items from a cart with a specific Id (cartId)
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         description: Cart's Id.
 *         schema:
 *           $type: String
 *     responses:
 *       204:
 *         description: The specified cart was successfully cleared out.
 *       400:
 *         description: The cartId parameter's value might not be valid.
 *       401:
 *         description: User is not authenticated.
 *       403:
 *         description: User is not allowed to perform this operation.
 *       404:
 *         description: The cart specified was not found.
 *       500:
 *         description: Unidentified server-side error.
 */
router.delete("/:cartId", auth, CartController.clearCartItems);

/**
 * @swagger
 * /api/carts/{cartId}/{productId}:
 *   get:
 *     summary: Adds a new product (cart-item) to the cart.
 *     description: Adds a new product, identified by its Id (productId), to a cart identified by its Id (cartId)
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         description: Cart's Id.
 *         schema:
 *           $type: String
 *       - name: productId
 *         in: path
 *         required: true
 *         description: Product's Id.
 *         schema:
 *           $type: String
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/requestBodies/addCartItem'
 *     responses:
 *       201:
 *         description: Successfully added a new item to the cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Cart'
 *       400:
 *         description: One of the parameters' values might not be valid.
 *       401:
 *         description: User is not authenticated.
 *       403:
 *         description: User is not allowed to perform this operation.
 *       404:
 *         description: Eiter the requested cart, or the requested product, was not found.
 *       500:
 *         description: Unindentified server-side error.
 */
router.post("/:cartId/:productId", auth, CartController.addCartItem);

/**
 * @swagger
 * /api/carts/{cartId}/{productId}:
 *   put:
 *     summary: Updates a specific cart-item.
 *     description: Updates quantity and/or sales price for a specific cart-item, identified by its Id (productId)
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         description: Cart's Id.
 *         schema:
 *           $type: String
 *       - name: productId
 *         in: path
 *         required: true
 *         description: Cart-item's product Id.
 *         schema:
 *           $type: String
 *     requestBody:
 *       required: true
 *       content:
 *         applicatin/json:
 *           schema:
 *             $ref: '#components/requestBodies/updateCartItem'
 *     responses:
 *       200:
 *         description: Successfully updated the specified cart-item.
 *       400:
 *         description: One of the parameter's values might not be valid.
 *       401:
 *         description: User is not authenticated.
 *       403:
 *         description: User is not allowed to perform this operation.
 *       404:
 *         description: Specified cart, and/or cart-item, were not found.
 *       500:
 *         description: Unidentified server-side error.
 */
router.put("/:cartId/:productId", auth, CartController.updateCartItem);

/**
 * @swagger
 * /api/carts/{cartId}/{productId}:
 *   delete:
 *     summary: Removes a specific cart-item.
 *     description: Removes a specific cart-item, identified by it's productId, from a cart identified by it's Id (cartId).
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         description: Cart's Id.
 *         schema:
 *           $type: String
 *       - name: productId
 *         in: path
 *         required: true
 *         description: Cart-item's Id.
 *         schema:
 *           $type: String
 *     responses:
 *       204:
 *         description: Successfully removed the specified cart-item.
 *       400:
 *         description: One of the arameter's values might not be valid.
 *       401:
 *         description: User is not authenticated.
 *       403:
 *         description: User is not allowed to perform this operation.
 *       404:
 *         description: Specified cart and/or cart-item, were not found.
 *       500:
 *         description: Unidentified server-side error.
 */
router.delete("/:cartId/:productId", auth, CartController.deleteCartItem);

export default router;
