import { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";

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
    related: [String],
  },
  {
    timestamps: true,
  }
);

categorySchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deleted", "deletedAt"],
});

const CategoryModel = model("categories", categorySchema);

export default CategoryModel;
