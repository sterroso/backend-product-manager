import CartModel from "../models/cart.model.js";

export const getCarts = async () => {
  try {
    const carts = await CartModel.find({ deleted: false });

    return carts;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCart = async (cartId) => {
  try {
    const cart = await CartModel.findById(cartId, {}, { deleted: false });

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDeletedCarts = async () => {
  try {
    const allDeletedCarts = await CartModel.findManyDeleted();

    return allDeletedCarts;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDeletedCart = async (cartId) => {
  try {
    const deletedCart = await CartModel.findOneDeleted({ _id: cartId });

    return deletedCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createCart = async () => {
  try {
    const newCart = await CartModel.create({ total: 0, count: 0, items: [] });

    return newCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const restoreCart = async (cartId) => {
  try {
    const deletedCart = await CartModel.findOneDeleted({ _id: cartId });

    if (!deletedCart) throw new Error("Cart not found");

    await CartModel.restore({ _id: cartId });
    const updatedCart = await CartModel.findByIdAndUpdate(
      cartId,
      {
        $unset: { deletedAt: 1 },
      },
      { new: true }
    );

    return updatedCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCart = async (cartId) => {
  try {
    const cartToBeDeleted = await CartModel.findById(cartId);

    if (!cartToBeDeleted) {
      return null;
    }

    if (cartToBeDeleted.items.length > 0) {
      throw new Error("Cart must be empty to be deleted.");
    }

    const deletedMessage = await CartModel.deleteOne({ _id: cartId });

    return deletedMessage;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addCartItem = async (cartId, productItem) => {
  try {
    const cartToBeUpdated = await CartModel.findById(cartId);

    if (!cartToBeUpdated) {
      throw new Error("Cart not found");
    }

    const existingItem = cartToBeUpdated.items.find(
      (item) => item.productId == productItem.productId
    );

    if (!existingItem) {
      cartToBeUpdated.items.push(productItem);
    } else {
      existingItem.quantity += productItem.quantity;
    }

    cartToBeUpdated.save((error, cart) => {
      if (error) throw new Error(error.message);

      cart.total = cart.items.reduce(
        (sum, item) => (sum += item.salesPrice * item.quantity),
        0
      );
      cart.count = cart.items.reduce(
        (count, item) => (count += item.quantity),
        0
      );

      cart.save();
    });

    return cartToBeUpdated;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCartItem = async (cartId, productItem) => {
  try {
    const cartToBeUpdated = await CartModel.findById(cartId);

    if (!cartToBeUpdated) {
      throw new Error("Cart not found");
    }

    const itemToBeUpdated = cartToBeUpdated.items.find(
      (item) => item.productId == productItem.productId
    );

    if (!itemToBeUpdated) {
      throw new Error("Cart item not found");
    }

    itemToBeUpdated.quantity = productItem.quantity ?? itemToBeUpdated.quantity;
    itemToBeUpdated.salesPrice =
      productItem.salesPrice ?? itemToBeUpdated.salesPrice;

    cartToBeUpdated.save((error, cart) => {
      if (error) throw new Error(error.message);

      cart.total = cart.items.reduce(
        (sum, item) => (sum += item.salesPrice * item.quantity),
        0
      );
      cart.count = cart.items.reduce(
        (count, item) => (count += item.quantity),
        0
      );

      cart.save();
    });

    return cartToBeUpdated;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const clearCartItems = async (cartId) => {
  try {
    const cartToBeCleared = await CartModel.findById(cartId);

    if (!cartToBeCleared) throw new Error("Cart not found");

    cartToBeCleared.items = [];
    cartToBeCleared.count = 0;
    cartToBeCleared.total = 0;
    await cartToBeCleared.save();

    return cartToBeCleared;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const removeCartItem = async (cartId, productId) => {
  try {
    const cartToBeUpdated = await CartModel.findById(cartId);

    if (!cartToBeUpdated) throw new Error("Cart not found.");

    cartToBeUpdated.items = cartToBeUpdated.items.filter(
      (item) => item.productId != productId
    );
    cartToBeUpdated.save((error, cart) => {
      if (error) throw new Error(error.message);

      cart.total = cart.items.reduce(
        (sum, item) => (sum += item.salesPrice * item.quantity),
        0
      );
      cart.count = cart.items.reduce(
        (count, item) => (count += item.quantity),
        0
      );

      cart.save();
    });

    return cartToBeUpdated;
  } catch (error) {
    throw new Error(error.message);
  }
};
