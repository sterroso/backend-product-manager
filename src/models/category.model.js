import { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";

const schema = new Schema(
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

schema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

const CategoryModel = model("categories", schema);

export default CategoryModel;
