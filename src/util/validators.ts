import _ from "lodash";
import options from "./options";
import {
  EmailInvalid,
  PasswordInvalid,
  PostBodyInvalid,
  PostBodySurpassMaxLength,
  GroupNameInvalid,
  GroupTeachersInvalid,
  GroupAllowedClassesInvalid,
  CommentBodyInvalid,
  CommentBodySurpassMaxLength,
  StudentMarkInvalid,
  EmailNotProvided,
  PasswordNotProvided,
  FullNameNotProvided,
  ProfileFullNameInvalid,
  ProfileFullNameSurpassMaxLength,
  PasswordConfirm,
  ProfileEmailInvalid,
  PasswordInvalidExtended,
} from "../errors";
import { IGroup, IProfile, IPostComment } from "../@types/tuesplace/";

const validatePost = ({ body }: IPostComment) => {
  const errors = [];
  if (!_.isString(body) || !body.length) {
    errors.push(PostBodyInvalid);
  } else if (body.length > 1000) {
    errors.push(PostBodySurpassMaxLength);
  }

  return {
    errors,
    valid: !errors.length,
  };
};

const validateComment = ({ body }: IPostComment) => {
  const errors = [];
  if (!_.isString(body) || !body.length) {
    errors.push(CommentBodyInvalid);
  } else if (body.length > 1000) {
    errors.push(CommentBodySurpassMaxLength);
  }

  return {
    errors,
    valid: !errors.length,
  };
};

const validatePassword = (password: string) => {
  const regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
  return (
    password &&
    (!_.isString(password) ||
      password === "" ||
      !password.match(regExPass) ||
      password.length < 7)
  );
};

const validateSignUp = (
  fullName: string,
  email: string,
  password: string,
  passwordConfirm: string
) => {
  const { errors } = validateUser(
    <IProfile>{ fullName, email, password },
    true
  );

  if (password !== passwordConfirm) {
    errors.push(PasswordConfirm);
  }

  return {
    errors,
    valid: errors.length < 1,
  };
};

const validateSignIn = (email: string, password: string) => {
  const errors = [];

  if (!_.isString(email)) {
    errors.push(EmailInvalid);
  }
  if (!_.isString(password) || !password.length) {
    errors.push(PasswordInvalid);
  }
  return {
    errors,
    valid: !errors.length,
  };
};

const validateUser = (
  { fullName, email, password }: IProfile,
  isStrict: boolean
) => {
  const errors = [];

  if (isStrict) {
    if (_.isEmpty(email) || _.isEmpty(password) || _.isEmpty(fullName)) {
      errors.push(EmailNotProvided, PasswordNotProvided, FullNameNotProvided);
      return {
        errors,
        valid: false,
      };
    }
  }

  if (
    (!_.isEmpty(fullName) || isStrict) &&
    (!_.isString(fullName) || fullName === "")
  ) {
    errors.push(ProfileFullNameInvalid);
    if (fullName.length > 100) {
      errors.push(ProfileFullNameSurpassMaxLength);
    }
  }

  const regExEmail =
    // eslint-disable-next-line no-control-regex
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (
    (!_.isEmpty(email) || isStrict) &&
    (!_.isString(email) || email === "" || !email.match(regExEmail))
  ) {
    errors.push(ProfileEmailInvalid);
  }

  if ((!_.isEmpty(password) || isStrict) && validatePassword(password)) {
    errors.push(PasswordInvalidExtended);
  }

  return {
    errors,
    valid: errors.length < 1,
  };
};

const validateGroup = (
  { groupName, teachers, allowedClasses }: IGroup,
  isStrict: boolean
) => {
  const errors = [];
  if (
    (!groupName || isStrict) &&
    (!_.isString(groupName) || groupName.length > 150)
  ) {
    errors.push(GroupNameInvalid);
  }
  if ((!teachers || isStrict) && (!_.isArray(teachers) || !teachers.length)) {
    errors.push(GroupTeachersInvalid);
  }
  if (
    (!allowedClasses || isStrict) &&
    (!_.isArray(allowedClasses) ||
      !!allowedClasses.filter((e) => !options.classes.includes(e)).length)
  ) {
    errors.push(GroupAllowedClassesInvalid);
  }

  return {
    errors,
    valid: !errors.length,
  };
};

const validateMark = (mark: number) => {
  const errors = [];

  if (!_.isNumber(mark) || mark < 2 || mark > 6) {
    errors.push(StudentMarkInvalid);
  }

  return {
    errors,
    valid: !errors.length,
  };
};

export {
  validateUser,
  validateComment,
  validatePassword,
  validateSignUp,
  validateSignIn,
  validatePost,
  validateGroup,
  validateMark,
};
