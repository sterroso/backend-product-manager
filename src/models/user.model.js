import { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
import moment from "moment";

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
    isAdmin: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

userSchema.virtual("age").get((value, virtual, doc) => {
  return moment().diff(doc.dateOfBirth, "years");
});

userSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deleted", "deletedAt"],
});

const UserModel = model("users", userSchema);

export default UserModel;
