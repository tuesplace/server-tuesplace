import {
  Named,
  TypedError,
  ValueType,
  Translation,
  Resource,
  Role,
} from "../@types/tuesplace";

export const NotFoundError = ({ name }: Named): TypedError => ({
  type: "NotFoundError",
  message: {
    eng: `${name.eng} was not found in our database`,
    bg: `'${name.bg}' не е намерен`,
  },
});

export const NotProvidedError = ({ name }: Named): TypedError => ({
  type: "NotProvidedError",
  message: {
    eng: `${name.eng} was not provided `,
    bg: `'${name.bg}' не е предоставен`,
  },
});

export const BreaksRulesError = (requirement: Translation): TypedError => ({
  type: "BreaksRuleError",
  message: requirement,
});

export const InvalidTypeError = (
  { name }: Named,
  type: ValueType
): TypedError => ({
  type: "InvalidType",
  message: {
    eng: `${name.eng} is not a ${type.eng}`,
    bg: `${name.bg} не е ${type.bg}`,
  },
});

export const WrongPasswordError: TypedError = {
  type: "WrongPassword",
  message: {
    eng: "Password is incorrect",
    bg: "Паролата е грешна",
  },
};

export const EmailUsernameTakenError: TypedError = {
  type: "EmailTaken",
  message: {
    eng: "Email is already used by another account",
    bg: "Имейлът се използва от друг акаунт",
  },
};

export const NotConformToSchemaError = ({ name }: Named): TypedError => ({
  type: "NotConformToSchema",
  message: {
    eng: `${name.eng} does not conform to schema`,
    bg: `${name.bg} не е по схемата`,
  },
});

export const InvalidRangeError = (
  moreThan: number | string,
  lessThan: number | string = 0
): TypedError => ({
  type: "InvalidLength",
  message: {
    eng: `{{name.eng}} needs to have a length which is more than ${moreThan} and less than ${lessThan} `,
    bg: `Дължината на {{name.bg}} трябва да бъде по-голяма от ${moreThan} и по-малка от ${lessThan}`,
  },
});

export const PasswordConfirmError: TypedError = {
  type: "PasswordConfirm",
  message: {
    eng: "Password Confirm is not equal to Password",
    bg: "Паролите не съвпадат",
  },
};

export const OldTokenError: TypedError = {
  type: "OldToken",
  message: {
    eng: "Last sign in more than 20 minutes ago. You have to sign out and sign in again",
    bg: "Последното влизане в профила е било преди 20 минути. Трябва да излезете и влезете в профила си",
  },
};

export const PasswordPolicyError: TypedError = {
  type: "PasswordPolicyError",
  message: {
    eng: "Password must contain 1 upper-, 1 lower-cased letter, 1 number and 1 special character and be at least 7 characters long",
    bg: "Паролата трябва да съдържа 1 главна и 1 малка буква, 1 цифра и 1 специален символ и трябва да бъде поне 7 символа",
  },
};

export const NoQueryError = <T>(resource: Resource<T>): TypedError => ({
  type: "NoQueryError",
  message: {
    eng: `The server could not build a lookup query for ${resource.name.eng}. Contact an administrator`,
    bg: `Сървърът не успя да създате lookup заявка за ${resource.name.bg}. Свържете се с администратор.`,
  },
});

export const NotOwnerError = <T>(resource: Resource<T>): TypedError => ({
  type: "NotOwnerError",
  message: {
    eng: `You are not the owner of ${resource.name.eng}`,
    bg: `Вие не сте собственика на ${resource.name.bg}`,
  },
});

export const NotRoleError = (role: Role): TypedError => ({
  type: "NotRoleError",
  message: {
    eng: `Your profile is not a ${role.name.eng}`,
    bg: `Вашият профил не е ${role.name.bg}`,
  },
});

export const InvalidValueError = (expectedValue: any): TypedError => ({
  type: "InvalidValueError",
  message: {
    eng: `{{name.eng}} was supposed to have a value equal to '${expectedValue}'`,
    bg: `{{name.bg}} е трябвало да има стойност, равна на '${expectedValue}'`,
  },
});

export const NoAccessError = <T>(resource: Resource<T>): TypedError => ({
  type: "NoWriteAccess",
  message: {
    eng: `You do not have access to this ${resource.name.eng}`,
    bg: `Нямате достъп до ${resource.name.bg}`,
  },
});

export const PasswordRedundantError: TypedError = {
  type: "PasswordRedundantError",
  message: {
    eng: "Your new password cannot be the same as your old one",
    bg: "Новата Ви парола не може да бъде същата със старата",
  },
};

export const NotConformToArrayError = (array: any[]): TypedError => ({
  type: "NotConformToArrayError",
  message: {
    eng: `{{name.eng}} can have one or more of the following values: [${array}]`,
    bg: `{{name.bg}} може да има следните възможни стойности: [${array}]`,
  },
});

export const NotUniqueError = <T>({ name }: Resource<T>): TypedError => ({
  type: "NotUniqueError",
  message: {
    eng: `{{name.eng}} has already been used in another ${name.eng}`,
    bg: `{{name.bg}} се ползва от друг ${name.bg}`,
  },
});

export const ArrayElementsNotUniqueError: TypedError = {
  type: "ArrayElementsNotUniqueError",
  message: {
    eng: "{{name.eng}} must be an array of unique values",
    bg: "{{name.bg}} трябва да бъде масив от различни стойности",
  },
};
