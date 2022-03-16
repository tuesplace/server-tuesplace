module.exports = (_, res, next) => {
  res.sendRes = (response) => {
    res.send({ success: true, response });
  };
  next();
};
