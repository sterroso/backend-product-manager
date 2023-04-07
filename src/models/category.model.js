/* --------------------------------- Imports -------------------------------- */
import { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
import MongoosePaginate from "mongoose-paginate-v2";

/* ----------------------------- Implementation ----------------------------- */
export const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3,
      maxLength: 36,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.plugin(MongooseDelete, {
  overrideMethods: [/find/gi, /update/gi, /delete/gi],
  indexFields: ["deleted", "deletedAt"],
});

categorySchema.plugin(MongoosePaginate);

const CategoryModel = model("Category", categorySchema);

/* ----------------------------- Module Exports ----------------------------- */
export default CategoryModel;
