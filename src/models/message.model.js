import { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
import UserModel from "./user.model.js";

export const messageSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: UserModel,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deleted", "deletedAt"],
});

const MessageModel = model("messages", messageSchema);

export default MessageModel;
