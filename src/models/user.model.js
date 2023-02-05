import { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";

export const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 99,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 36,
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
      maxLength: 72,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deleted", "deletedAt"],
});

const UserModel = model("users", userSchema);

export default UserModel;
