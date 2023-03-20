import { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
import ProductModel from "./product.model.js";

export const cartItemSchema = new Schema({
  product: {
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

cartItemSchema.virtual("subtotal").get(() => {
  return this.salesPrice * this.quantity;
});

export const CartItemModel = model("cartItem", cartItemSchema);

export const cartSchema = new Schema(
  {
    items: [{ type: Schema.Types.ObjectId, ref: CartItemModel }],
  },
  {
    timestamps: true,
  }
);

cartSchema.virtual("count").get(() => {
  return this.items.reduce((count, item) => (count += item.quantity), 0);
});

cartSchema.virtual("total").get(() => {
  return this.items.reduce((total, item) => (total += item.subtotal), 0);
});

cartSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deleted", "deletedAt"],
});

const CartModel = model("cart", cartSchema);

export default CartModel;
