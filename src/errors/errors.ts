import {
  Named,
  TypedError,
  ValueType,
  RequestBodyBlueprint,
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

export const NotComformToSchemaError = (
  { name }: Named,
  schema: RequestBodyBlueprint
): TypedError => ({
  type: "NotComformToSchema",
  message: {
    eng: `${name.eng} does not comform to schema {${Object.keys(schema).map(
      (key) => `${key}: ${schema[key].name.eng}`
    )}}`,
    bg: `${name.bg} не е по схемата {${Object.keys(schema).map(
      (key) => `${key}: ${schema[key].name.bg}`
    )}}`,
  },
});

export const InvalidLengthError = (
  { name }: Named,
  length: number | string
): TypedError => ({
  type: "InvalidLength",
  message: {
    eng: `${name.eng} length is not ${length}`,
    bg: `Дължината на ${name.bg} не е ${length}`,
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

export const NoWriteAccessError = <T>(resource: Resource<T>): TypedError => ({
  type: "NoWriteAccess",
  message: {
    eng: `You do not have permission to write to ${resource.name.eng}`,
    bg: `Нямате правата да променяте ${resource.name.bg}`,
  },
});

export const PasswordRedundantError: TypedError = {
  type: "PasswordRedundantError",
  message: {
    eng: "Your new password cannot be the same as your old one",
    bg: "Новата Ви парола не може да бъде същата със старата",
  },
};
