const _ = require("lodash");
const { validateUserProps } = require("./userValidators");

const validateSignUpProps = (fullName, email, password, passwordConfirm) => {
  const { errors, __ } = validateUserProps({ fullName, email, password }, true);

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Паролите не съвпадат";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateSignInProps = (email, password) => {
  const errors = {};

  if (!_.isString(email)) {
    errors.email = "email must be a valid string";
  }
  if (!_.isString(password)) {
    errors.password = "Password must be a valid string and must not be empty";
  }
  if (password === "") {
    errors.password = "Паролата не може да бъде празна";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports = {
  validateSignUpProps,
  validateSignInProps,
};
