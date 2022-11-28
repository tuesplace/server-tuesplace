import _ from "lodash";
import {
  AssignmentInfo,
  Email,
  GroupClasses,
  MarkField,
  Password,
  Role,
} from "../definitions";
import {
  InvalidTypeError,
  PasswordConfirmError,
  PasswordPolicyError,
  BreaksRulesError,
} from "../errors";
import { allRoles } from "../definitions";
import {
  Assert,
  Assignment,
  Named,
  Rule,
  TypedError,
} from "../@types/tuesplace";
import { renderTranslation } from "./translation";
import { emojis } from "../util";

const refactorRules = async (value: any, rules: Rule[], field: Named) => {
  const brokenRules: TypedError[] = [];
  for (const key in rules) {
    for (const assertKey in rules[key].assertions) {
      if (!(await rules[key].assertions[assertKey](value))) {
        brokenRules.push(
          BreaksRulesError(renderTranslation(rules[key].requirement, field))
        );
      }
    }
  }
  if (brokenRules.length) {
    return brokenRules;
  }
  return null;
};

export const assertEmail = (rules?: Rule[]) => async (email: string) => {
  const regExEmail =
    // eslint-disable-next-line no-control-regex
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  if (rules && rules.length) {
    const rrules = await refactorRules(email, rules, Email);
    return rrules;
  }
  return !email.match(regExEmail) ? InvalidTypeError(Email, Email.name) : null;
};

export const assertPassword =
  (rules?: Rule[]): Assert =>
  async (password: string) => {
    const regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
    if (!password.match(regExPass) || password.length < 7) {
      return PasswordPolicyError;
    }

    if (rules && rules.length) {
      const refactoredRules = await refactorRules(password, rules, Password);
      return refactoredRules;
    }
    return null;
  };

export const assertPasswordConfirm = (passwordConfirm: string, obj: any) => {
  if (passwordConfirm != obj.password) {
    return PasswordConfirmError;
  }
  return null;
};

export const assertRole = (role: unknown) => {
  if (
    !_.isString(role) ||
    !allRoles.filter((roleDef) => roleDef.value === role)
  ) {
    return InvalidTypeError(Role, Role.name);
  }
  return null;
};

export const assertString =
  (field: Named) => (rules?: Rule[]) => (string: any) => {
    if (!_.isString(string) || !string.length) {
      return InvalidTypeError(field, field.name);
    }
    if (rules && rules.length) {
      return refactorRules(string, rules, field);
    }
    return null;
  };

export const assertBoolean =
  (field: Named) => (rules?: Rule[]) => (boolean: any) => {
    if (!_.isBoolean(boolean)) {
      return InvalidTypeError(field, field.name);
    }
    if (rules && rules.length) {
      return refactorRules(boolean, rules, field);
    }

    return null;
  };

export const assertEmoji =
  (field: Named) => (rules?: Rule[]) => (emoji: any) => {
    if (!_.isString(emoji) || !emojis.includes(emoji)) {
      return InvalidTypeError(field, field.name);
    }
    if (rules && rules.length) {
      return refactorRules(emoji, rules, field);
    }
    return null;
  };

export const assertMark = (mark: any) => {
  if (!_.isNumber(mark) || mark < 2 || mark > 6) {
    return InvalidTypeError(MarkField, MarkField.name);
  }
  return null;
};

export const assertGroupClasses = (rules: Rule[]) => (classes: any) => {
  if (!_.isArray(classes) || !classes.length) {
    return InvalidTypeError(GroupClasses, GroupClasses.name);
  }
  if (rules && rules.length) {
    return refactorRules(classes, rules, GroupClasses);
  }
  return null;
};

export const assertAssignmentInfo = (assignmentInfo: any) => {
  if (
    !_.isObject(assignmentInfo) ||
    !Object.keys(assignmentInfo).length ||
    Object.keys(assignmentInfo).length > 2 ||
    !_.isBoolean(
      (assignmentInfo as Assignment).isAssignment ||
        !_.isDate((assignmentInfo as Assignment).deadline)
    )
  ) {
    return InvalidTypeError(AssignmentInfo, AssignmentInfo.name);
  }
  return null;
};
