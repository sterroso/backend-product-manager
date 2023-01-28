import { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
import ProductModel from "./product.model.js";

export const cartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: ProductModel,
  },
  salesPrice: {
    type: Schema.Types.Decimal128,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    requried: true,
    min: 1,
    default: 1,
  },
});

export const cartSchema = new Schema(
  {
    total: {
      type: Schema.Types.Decimal128,
      required: true,
      min: 0,
      default: 0,
    },
    count: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    items: [{ type: cartItemSchema }],
  },
  {
    timestamps: true,
  }
);

cartSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deleted", "deletedAt"],
});

export const CartItemModel = model("cartItem", cartItemSchema);

const CartModel = model("cart", cartSchema);

export default CartModel;
