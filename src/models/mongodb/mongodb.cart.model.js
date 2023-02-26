import { Schema, model } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import MongooseDelete from "mongoose-delete";
import ProductModel from "./mongodb.product.model.js";

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

export const cartSchema = new Schema(
  {
    items: [{ type: cartItemSchema }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

cartSchema.virtual("total").get(() => {
  return this.items.reduce((sum, item) => (sum += item.subtotal), 0);
});

cartSchema.virtual("count").get(() => {
  return this.items.reduce((count, item) => (count += item.quantity), 0);
});

cartSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deleted", "deletedAt"],
});

cartSchema.plugin(MongoosePaginate);

const CartModel = model("cart", cartSchema);

export default CartModel;
