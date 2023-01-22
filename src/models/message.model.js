import { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";

const schema = new Schema(
  {
    user: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
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

schema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: ["deleted", "deletedAt"],
});

const MessageModel = model("messages", schema);

export default MessageModel;
