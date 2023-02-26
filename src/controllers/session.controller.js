export const getCurrentSession = async (req, res) => {
  const returnObject = {};
  let returnStatus = 200;

  console.log(req.sessionID);

  res.status(returnStatus).json(returnObject);
};
