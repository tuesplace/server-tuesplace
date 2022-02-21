const _ = require("lodash");
const options = require("./options");

const validatePost = ({ body }) => {
  const errors = {};
  if (!_.isString(body)) {
    errors.body = "Body must be a valid string";
  } else if (body.length > 750) {
    errors.body = "Тялото на поста е твърде дълго";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validatePassword = (password) => {
  const regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
  return (
    password &&
    (!_.isString(password) || password === "" || !password.match(regExPass) || password.length < 7)
  );
};

const validateSignUp = (fullName, email, password, passwordConfirm) => {
  const { errors, __ } = validateUser({ fullName, email, password }, true);

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Паролите не съвпадат";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateSignIn = (email, password) => {
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

const validateUser = ({ fullName, email, password }, isStrict) => {
  const errors = {};

  if (isStrict) {
    if (_.isEmpty(email) || _.isEmpty(password) || _.isEmpty(fullName)) {
      errors.general = "Props must not be empty";
      return {
        errors,
        valid: false,
      };
    }
  }

  if (
    (!_.isEmpty(fullName) || isStrict) &&
    (!_.isString(fullName) || fullName === "" || fullName.length > 100)
  ) {
    errors.fullName = "Пълното име трябва да е валидно име";
  }

  const regExEmail =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (
    (!_.isEmpty(email) || isStrict) &&
    (!_.isString(email) || email === "" || !email.match(regExEmail))
  ) {
    errors.email = "Имейлът трябва да е валиден имейл";
  }

  if ((!_.isEmpty(password) || isStrict) && validatePassword(password)) {
    errors.password =
      "Паролата трябва да съдържа поне 1 цифра, 1 главна и 1 малка буква на латиница и трябва да има дължина от минимум 7 символа";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateGroup = ({ groupName, teachers, allowedClasses }, isStrict) => {
  const errors = {};
  if ((!groupName || isStrict) && (!_.isString(groupName) || groupName.length > 150)) {
    errors.groupName = "Invalid groupName";
  }
  if ((!teachers || isStrict) && (!_.isArray(teachers) || !teachers.length)) {
    errors.teachers = "Invalid teachers";
  }
  if (
    (!allowedClasses || isStrict) &&
    (!_.isArray(allowedClasses) ||
      !!allowedClasses.filter((e) => !options.classes.includes(e)).length)
  ) {
    errors.allowedClasses = "Invalid allowedClasses";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports = {
  validateUser,
  validatePassword,
  validateSignUp,
  validateSignIn,
  validatePost,
  validateGroup,
};
