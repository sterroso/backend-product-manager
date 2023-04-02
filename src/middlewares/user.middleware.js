const payloadFormatter = (req, res, next) => {
  console.log(res.payload);
  next();
};

export default payloadFormatter;