const lodash = require("lodash");

module.exports = (err, _, res, __) => {
  res.status(err.name ? 400 : err.status || 500).send({
    success: false,
    errors: err.name
      ? { [err.name]: err.message }
      : { ...lodash.omit({ ...err }, "status") },
  });
};
