import WarehouseModel from "../../models/mongodb/mongodb.warehouse.model.js";

export const getAllWarehouses = async (query, options) => {
  try {
    return await WarehouseModel.paginate(query, options);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getWarehouseById = async (warehouseId) => {
  try {
    return await WarehouseModel.findOne({ _id: warehouseId });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createWarehouse = async (data) => {
  try {
    return await WarehouseModel.create(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateWarehouseById = async (warehouseId, data) => {
  try {
    return await WarehouseModel.findOneAndUpdate({ _id: warehouseId }, data, {
      new: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteWarehouseById = async (warehouseId) => {
  try {
    return await WarehouseModel.deleteOne({ _id: warehouseId });
  } catch (error) {
    throw new Error(error.message);
  }
};
