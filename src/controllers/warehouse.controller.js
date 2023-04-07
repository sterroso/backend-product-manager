import * as WarehouseService from "../services/mongodb/mongodb.warehouse.service.js";
import {
  PaginateCustomLabels,
  HttpResponseStatusCodes as status,
} from "../config/app.constants.js";

const isValidOption = (option, minValue = 1) => {
  const intOption = Number(option);

  return !isNaN(intOption) && intOption >= minValue && intOption % 1 === 0;
};

const isValidLat = (lat) => {
  const numLat = Number(lat);

  return !isNaN(numLat) && numLat >= -90 && numLat <= 90;
};

const isValidLon = (lon) => {
  const numLon = Number(lon);

  return !isNaN(numLon) && numLon >= -180 && numLon <= 180;
};

export const getAllWarehouses = async (req, res) => {
  let returnObject = { status: status.SUCCESSFUL.OK.name };
  let returnStatus = status.SUCCESSFUL.OK.code;

  const query = { deleted: false };

  const options = { customLabels: PaginateCustomLabels };

  const {
    limit,
    page,
    offset,
    sortByCountryCode,
    countryCode,
    state,
    city,
    lat,
    lon,
  } = req.query;

  options.limit = isValidOption(limit) ? Number(limit) : 10;

  options.page = isValidOption(page) ? Number(page) : 1;

  if (isValidOption(offset, 0)) {
    options.offset = Number(offset);
  }

  if (["asc", "desc"].includes(sortByCountryCode)) {
    options.sort = {
      location: { countryCode: sortByCountryCode === "asc" ? 1 : -1 },
    };
  }

  if (countryCode) {
    query.location = {
      countryCode: new RegExp(countryCode, "gi"),
    };
  }

  if (state) {
    if (query?.location) {
      query.location.state = new RegExp(state, "gi");
    } else {
      query.location = { state: new RegExp(state, "gi") };
    }
  }

  if (city) {
    if (query?.location) {
      query.location.city = new RegExp(city, "gi");
    } else {
      query.location = { city: new RegExp(city, "gi") };
    }
  }

  if (isValidLat(lat) && isValidLon(lon)) {
    if (query?.location) {
      query.location.coordinates = { lat: Number(lat), lon: Number(lon) };
    } else {
      query.location = { coordinates: { lat: Number(lat), lon: Number(lon) } };
    }
  }

  try {
    const results = await WarehouseService.getAllWarehouses(query, options);

    if (results.count > 0) {
      returnObject = results;
      returnObject.status = status.SUCCESSFUL.OK.name;
    } else {
      returnStatus = status.CLIENT_ERROR.NOT_FOUND.code;

      returnObject.status = status.CLIENT_ERROR.NOT_FOUND.name;
      returnObject.error =
        "No warehouses were found with the provided paramters.";
    }
  } catch (error) {
    returnStatus = status.SERVER_ERROR.INTERNAL_SERVER_ERROR.code;

    returnObject.status = status.SERVER_ERROR.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const getWarehouseById = async (req, res) => {
  const returnObject = { status: status.SUCCESSFUL.OK.name };
  let returnStatus = status.SUCCESSFUL.OK.code;

  const { warehouseId } = req.params;

  try {
    const result = await WarehouseService.getWarehouseById(warehouseId);

    if (result) {
      returnObject.payload = result;
    } else {
      returnStatus = status.CLIENT_ERROR.NOT_FOUND.code;

      returnObject.status = status.CLIENT_ERROR.NOT_FOUND.name;
      returnObject.error = `No warehouse with id ${warehouseId} was found.`;
    }
  } catch (error) {
    returnStatus = status.SERVER_ERROR.INTERNAL_SERVER_ERROR.code;

    returnObject.status = status.SERVER_ERROR.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const createWarehouse = async (req, res) => {
  const returnObject = { status: status.SUCCESSFUL.CREATED.name };
  let returnStatus = status.SUCCESSFUL.CREATED.code;

  const { body } = req;

  try {
    const result = await WarehouseService.createWarehouse(body);

    if (result) {
      returnObject.payload = result;
    } else {
      returnStatus = status.CLIENT_ERROR.BAD_REQUEST.code;

      returnObject.status = status.CLIENT_ERROR.BAD_REQUEST.name;
      returnObject.error = "Warehouse could not be created.";
    }
  } catch (error) {
    returnStatus = status.SERVER_ERROR.INTERNAL_SERVER_ERROR.code;

    returnObject.status = status.SERVER_ERROR.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const updateWarehouseById = async (req, res) => {
  const returnObject = { status: status.SUCCESSFUL.OK.name };
  let returnStatus = status.SUCCESSFUL.OK.code;

  const { warehouseId } = req.params;

  const { body } = req;

  try {
    const result = await WarehouseService.updateWarehouseById(
      warehouseId,
      body
    );

    if (result) {
      returnObject.payload = result;
    } else {
      returnStatus = status.CLIENT_ERROR.NOT_FOUND.code;

      returnObject.status = status.CLIENT_ERROR.NOT_FOUND.name;
      returnObject.error = `No warehouse with id ${warehouseId} was found.`;
    }
  } catch (error) {
    returnStatus = status.SERVER_ERROR.INTERNAL_SERVER_ERROR.code;

    returnObject.status = status.SERVER_ERROR.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const deleteWarehouseById = async (req, res) => {
  const returnObject = { status: status.SUCCESSFUL.OK.name };
  let returnStatus = status.SUCCESSFUL.OK.code;

  const { warehouseId } = req.params;

  try {
    const confirmation = await WarehouseService.deleteWarehouseById(
      warehouseId
    );

    if (confirmation) {
      returnObject.confirmation = confirmation;
    } else {
      returnStatus = status.CLIENT_ERROR.NOT_FOUND.code;

      returnObject.status = status.CLIENT_ERROR.NOT_FOUND.name;
      returnObject.error = `No warehouse with id ${warehouseId} was found.`;
    }
  } catch (error) {
    returnStatus = status.SERVER_ERROR.INTERNAL_SERVER_ERROR.code;

    returnObject.status = status.SERVER_ERROR.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};
