import { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
import MongoosePaginate from "mongoose-paginate-v2";
import CategoryModel from "./mongodb.category.model.js";

export const productSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      minLength: 3,
      maxLength: 27,
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
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: CategoryModel,
      },
    ],
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
    thumbnails: [String],
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
