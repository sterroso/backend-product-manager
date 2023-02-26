import { ObjectId } from "mongoose";
import depd from "depd";
import CartModel from "../../models/mongodb/mongodb.cart.model.js";
import UserModel from "../../models/mongodb/mongodb.user.model.js";
import ProductModel from "../../models/mongodb/mongodb.product.model.js";

const deprecation = depd("MongoDB Cart Service");
/**
 * Returns a list of all carts stored in the database.
 *
 * @param {Object} query A MongoDB style query.
 * @param {Object} options A list of options for pagination. Might include
 * parameters like **limit**, **page** and **sort**.
 * @returns {[Object]} An array of existing carts.
 */
export const getCarts = async (query, options) => {
  /*****************************************************************
   * I (Sergio Terroso) do not consider this method is helpful.
   * I'm seriously considering removing it in future versions.
   * I just can't see how would it be useful to have a list of
   * all carts without the owner's reference.
   *
   * It currently requires to add a pagination plugin, which adds
   * complexity and overhead, and solves nothing but a mere
   * academic need.
   ****************************************************************/
  deprecation("getCarts");

  try {
    return await CartModel.paginate(query, options).populate({
      path: "items.product",
      select: "code title description stock thumbnails",
      options: {
        lean: true,
        toObject: { virtuals: true },
        transform: (doc, ret, options) => {
          ret.id = ret._id;
          delete ret._id;
        },
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Searches for a specific user, identified by its _id field, and returns
 * it's cart.
 *
 * @param {ObjectId} userId The cart's owner id.
 * @returns The user's cart.
 */
export const getCartByUserId = async (userId) => {
  try {
    const cartOwner = await UserModel.findById(userId);

    if (!cartOwner) throw new Error("User not found");

    if (!cartOwner.cart) throw new Error("User has no cart.");

    return await CartModel.findById(cartOwner.cart).populate({
      path: "items.product",
      select: "code title description stock thumbnails",
      options: {
        lean: true,
        toObject: { virtuals: true },
        transform: (doc, ret, options) => {
          ret.id = ret._id;
          delete ret._id;
        },
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Searches for a user's cart. If found, replaces all of his cart's items
 * with the new cart items provided.
 *
 * @param {ObjectId} userId The cart's owner id.
 * @param {[Object]} cartItems An array of objects containing cartItem's
 * properties: *product*, *salesPrice* and *quantity*.
 * @returns The user's cart updated.
 */
export const updateCart = async (userId, cartItems) => {
  try {
    const cartOwner = await UserModel.findById(userId);

    if (!cartOwner) throw new Error("User not found.");

    return await CartModel.findByIdAndUpdate(
      cartOwner.cart,
      {
        $set: { items: cartItems },
      },
      { new: true }
    ).populate({
      path: "items.product",
      select: "code title description stock thumbnails",
      options: {
        lean: true,
        toObject: { virtuals: true },
        transform: (doc, ret, options) => {
          ret.id = ret._id;
          delete ret._id;
        },
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Searches for a user's cart. If not found, creates a new cart for the
 * specified user and adds the product identified by the *productId* parameter.
 * If the cart already had the specified product, adds the provided *quantity*
 * to the existing cart item.
 *
 * @param {ObjectId} userId The cart's owner id.
 * @param {ObjectId} productId An existing product's id.
 * @param {Number} quantity The quantity of products to be added to
 * the cart.
 * @returns The cart updated with the product and quantity provided.
 */
export const addCartItem = async (userId, productId, quantity = 1) => {
  try {
    const cartOwner = await UserModel.findById(userId);

    if (!cartOwner) throw new Error("User not found.");

    const existingProduct = ProductModel.findById(productId);

    if (!existingProduct) throw new Error("Specified product not found.");

    const cart = await CartModel.findById(cartOwner.cart);

    const existingCartItem = cart.items.find(
      (item) => item.product === productId
    );

    if (existingCartItem) {
      return await updateCartItem(userId, productId, {
        salesPrice: existingCartItem.salesPrice,
        quantity,
      });
    } else {
      cart.items.push({
        product: productId,
        salesPrice: existingProduct.price,
        quantity,
      });
    }

    return await cart.save().populate({
      path: "items.product",
      select: "code title description stock thumbnails",
      options: {
        lean: true,
        toObject: { virtuals: true },
        transform: (doc, ret, options) => {
          ret.id = ret._id;
          delete ret._id;
        },
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Updates the *salesPrice* and/or *quantity* for a cart item already contained
 * in a specific user's cart.
 *
 * @param {ObjectId} userId The cart's owner id.
 * @param {ObjectId} productId An existing product's id.
 * @param {Object} data An object containing properties for *salesPrice*
 * and *quantity* CartItem's fields.
 * @returns The cart updated with the *salesPrice* and *quantity*
 * provided for a specific cart item.
 * @throws Error if the user, identified by the *userId* parameter
 * provided, is not found.
 * @thorws Error if the product, identified by the *productId* parameter
 * provided, is not found.
 * @throws Error if the cart does not contain a cart item whose *product*
 * field value matches the *productId* parameter provided.
 */
export const updateCartItem = async (userId, productId, data) => {
  try {
    const cartOwner = await UserModel.findById(userId);

    if (!cartOwner) throw new Error("User not found.");

    const existingProduct = await ProductModel.findById(productId);

    if (!existingProduct) throw new Error("Specified product not found.");

    const cart = await createCartForUser(userId);

    const existingCartItem = cart.items.find(
      (item) => item.product === productId
    );

    if (!existingCartItem)
      throw new Error("Cart item not found in the user's cart.");

    existingCartItem = { ...data, product: productId };

    return await cart.save().populate({
      path: "items.product",
      select: "code title description stock thumbnails",
      options: {
        lean: true,
        toObject: { virtuals: true },
        transform: (doc, ret, options) => {
          ret.id = ret._id;
          delete ret._id;
        },
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Empties all cart items form a cart belonging to a specific user.
 *
 * @param {ObjectId} userId Te cart's onwer id.
 * @returns The cart with its *items* array emptied.
 * @throws Error if the user, identified by the *userId* parameter
 * provided, is not found.
 */
export const clearCartItems = async (userId) => {
  try {
    const cartOwner = await UserModel.findById(userId);

    if (!cartOwner) throw new Error("User not found.");

    const cart = await createCartForUser(userId);

    cart.items = [];

    return await cart.save().populate({
      path: "items.product",
      select: "code title description stock thumbnails",
      options: {
        lean: true,
        toObject: { virtuals: true },
        transform: (doc, ret, options) => {
          ret.id = ret._id;
          delete ret._id;
        },
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
