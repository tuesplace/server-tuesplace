import { Field, Named, Translation } from "../../@types/tuesplace";
import { ConformsToArray, LongerThan, Unique } from "../rules";

import {
  assertEmail,
  assertPassword,
  assertPasswordConfirm,
  assertRole,
  assertString,
  assertBoolean,
  assertEmoji,
  assertMark,
  assertGroupClasses,
  assertAssignmentInfo,
} from "../../util/assertions";
import {
  FullNameName,
  GroupTypeName,
  PasswordName,
  ReactionName,
} from "../names";
import { Profile as ProfileModel } from "../../models";
import { Profile as ProfileResource } from "../resources";
import { types as groupTypes, classes as groupClasses } from "../../util";

export const Email: Field = {
  name: {
    eng: "Email",
    bg: "Имейл",
  },
  assert: assertEmail(),
};

export const Password: Field = {
  ...PasswordName,
  assert: assertPassword([LongerThan(7)]),
};

export const Role: Field = {
  name: {
    eng: "Role",
    bg: "Роля",
  },
  assert: assertRole,
};

export const FullName: Field = {
  ...FullNameName,
  assert: assertString(FullNameName)(),
};

export const PasswordConfirm: Field = {
  name: {
    eng: "Password Confirm",
    bg: "Потвърждение на паролата",
  },
  assert: assertPasswordConfirm,
};

export const IRRepeatableEmail = {
  ...Email,
  assert: assertEmail([Unique(Email, ProfileModel, ProfileResource)]),
};

export const IRRepeatableString =
  (field: Named) => (checkModel: any, resource: Named) => ({
    ...field,
    assert: assertString(field)([Unique(field, checkModel, resource)]),
  });

export const StringField = (name: Translation): Field => ({
  name,
  assert: assertString({ name })(),
});

export const BooleanField = (name: Translation): Field => ({
  name,
  assert: assertBoolean({ name })(),
});

export const PostBody: Field = StringField({
  eng: "Post Body",
  bg: "Тяло на Пост",
});

export const CommentBody: Field = StringField({
  eng: "Comment Body",
  bg: "Тяло на Коментар",
});

export const CommentIsPrivate: Field = BooleanField({
  eng: "Comment isPrivate",
  bg: "Comment isPrivate",
});

export const Reaction: Field = {
  ...ReactionName,
  assert: assertEmoji(ReactionName),
};

export const MarkField: Field = {
  name: {
    eng: "Mark",
    bg: "Оценка",
  },
  assert: assertMark,
};

export const GroupType: Field = {
  ...GroupTypeName,
  assert: assertString(GroupTypeName)([ConformsToArray(groupTypes)]),
};

export const GroupClasses: Field = {
  name: {
    eng: "Group Classes",
    bg: "Класове на Група",
  },
  assert: assertGroupClasses([ConformsToArray(groupClasses)]),
};

export const AssignmentInfo: Field = {
  name: {
    eng: "Assignment Info",
    bg: "Информация за Задание",
  },
  optional: true,
  assert: assertAssignmentInfo,
};
