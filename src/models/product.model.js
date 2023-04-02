import { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
import MongoosePaginate from "mongoose-paginate-v2";
import CategoryModel from "./category.model.js";

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
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: CategoryModel,
      },
    ],
    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    thumbnails: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(MongooseDelete, {
  indexFields: ["deleted", "deletedAt"],
  overrideMethods: [/find/gi, /update/gi, /delete/gi],
});

productSchema.plugin(MongoosePaginate);

const ProductModel = model("Product", productSchema);

export default ProductModel;
