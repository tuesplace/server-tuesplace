const _ = require("lodash");
const passwordValidator = require("./passwordValidator");
const interestsOptions = require("./interests");

const validateUserProps = (
  { fullName, email, password, profilePic, interests, workPlace, cv, role },
  explicit
) => {
  const errors = {};

  if (explicit) {
    if (_.isEmpty(email) || _.isEmpty(password) || _.isEmpty(fullName)) {
      errors.general = "Props must not be empty";
      return {
        errors,
        valid: false,
      };
    }
  }

  if (
    !_.isEmpty(fullName) &&
    (!_.isString(fullName) || fullName === "" || fullName.length > 100)
  ) {
    errors.fullName = "Пълното име трябва да е валидно име";
  }

  const regExEmail =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (
    !_.isEmpty(email) &&
    (!_.isString(email) || email === "" || !email.match(regExEmail))
  ) {
    errors.email = "Имейлът трябва да е валиден имейл";
  }

  if (!_.isEmpty(password) && passwordValidator(password)) {
    errors.password =
      "Паролата трябва да съдържа поне 1 цифра, 1 главна и 1 малка буква и трябва да има дължина от минимум 7 символа";
  }
  const base64RegEx =
    /^(?:[A-Za-z\d+/]{4})*(?:[A-Za-z\d+/]{3}=|[A-Za-z\d+/]{2}==)?$/;
  if (
    !_.isEmpty(profilePic) &&
    (!_.isString(profilePic) || profilePic.match(base64RegEx))
  ) {
    errors.profilePic = "Profile Pic must be a valid base64 encoded image";
  }

  if (
    !_.isEmpty(interests) &&
    interests.filter((e) => !interestsOptions.includes(e).length)
  ) {
    errors.interests = "Interests have to conform to valid interestsOptions";
  }

  if (!_.isEmpty(workPlace) && !_.isString(workPlace)) {
    errors.workPlace = "Workplace must be a string";
  }

  if (!_.isEmpty(cv) && !_.isObject(cv)) {
    errors.cv = "CV must be a valid object";
  }

  if (
    !_.isEmpty(role) &&
    role !== "Ученик" &&
    role !== "Работодател" &&
    role !== "Лектор"
  ) {
    errors.role = "Invalid role";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports = {
  validateUserProps,
};
