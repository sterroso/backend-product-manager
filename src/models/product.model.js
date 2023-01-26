import { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
import MongoosePaginate from "mongoose-paginate-v2";

export const productSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      minLength: 3,
      maxLength: 18,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 36,
    },
    description: {
      type: String,
      required: true,
      minLength: 9,
      maxLength: 252,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    price: {
      type: Schema.Types.Decimal128,
      required: true,
      min: 0,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    thumbnails: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deleted", "deletedAt"],
});

productSchema.plugin(MongoosePaginate);

const ProductModel = model("product", productSchema);

export default ProductModel;
