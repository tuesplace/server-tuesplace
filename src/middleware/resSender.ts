export default (_, res, next) => {
  res.sendRes = (response) => {
    res.send({ success: true, response });
  };
  next();
};
