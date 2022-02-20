const _ = require("lodash");

const passwordValidator = (password) => {
  const regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
  return (
    password &&
    (!_.isString(password) ||
      password === "" ||
      !password.match(regExPass) ||
      password.length < 7)
  );
};

module.exports = passwordValidator;
