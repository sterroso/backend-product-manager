import { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
import MongoosePaginate from "mongoose-paginate-v2";
import moment from "moment";
import CartModel from "./mongodb.cart.model.js";

export const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      minLength: 5,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },
    middleName: {
      type: String,
      required: false,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
      alias: "dob",
    },
    gender: {
      type: String,
      enum: ["femenino", "masculino", "otro", "no especificado"],
      required: true,
      default: "no especificado",
    },
    password: {
      type: String,
      required: true,
    },
    verifiedEmail: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      uppercase: true,
      trim: true,
    },
    cart: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: CartModel,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

userSchema.virtual("age").get(() => {
  return moment().diff(this.dateOfBirth, "years");
});

userSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deleted", "deletedAt"],
});

userSchema.plugin(MongoosePaginate);

const UserModel = model("users", userSchema);

export default UserModel;
