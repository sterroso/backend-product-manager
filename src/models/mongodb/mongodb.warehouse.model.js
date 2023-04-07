import { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
import MongoosePaginate from "mongoose-paginate-v2";

export const WarehouseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 54,
    },
    location: {
      countryCode: {
        type: String,
        required: true,
        minLength: 2,
      },
      state: {
        type: String,
        required: true,
        minLength: 2,
      },
      city: {
        type: String,
        required: true,
        minLength: 3,
      },
      address: {
        street: {
          type: String,
          required: true,
          minLength: 3,
        },
        urbanization: {
          type: String,
          required: false,
        },
        zipCode: {
          type: String,
          required: true,
          minLength: 5,
        },
      },
      coordinates: {
        lat: {
          type: Number,
          required: true,
          min: -90,
          max: 90,
        },
        lon: {
          type: Number,
          required: true,
          min: -180,
          max: 180,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

WarehouseSchema.plugin(MongoosePaginate);

WarehouseSchema.plugin(MongooseDelete, {
  indexFields: ["deleted", "deletedAt"],
  overrideMethods: "all",
});

const warehouseModel = model("Warehouse", WarehouseSchema);

export default warehouseModel;
