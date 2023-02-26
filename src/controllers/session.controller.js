import { StatusCode, StatusString } from "../constants/constants.js";
import * as SessionService from "../services/session.service.js";

export const getCurrentSession = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  try {
    const session = await SessionService.getCurrentSession(req.sessionID);

    returnObject.status = StatusString.SUCCESS;
    returnObject.payload = session;
  } catch (error) {
    returnStatus = StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};
