const ResourceNotFound = (resource: string) => ({
  type: `${resource}NotFound`,
  message: `Resource of type ${resource} not found in database`,
});

const ResourceNotProvided = (resource: string) => ({
  type: `${resource}NotProvided`,
  message: `Resource of type ${resource} not provided`,
});

const ResourcePropInvalid = (resource: string, prop: string, type: string) => ({
  type: `${resource}${prop}Invalid`,
  message: `${prop} of ${resource} not a valid ${type}`,
});

const ResourcePropSurpassMaxLength = (resource: string, prop: string) => ({
  type: `${resource}BodySurpassMaxLength`,
  message: `${prop} of ${resource} exceeds maximum length`,
});

const NotResourceAuthor = (resource: string) => ({
  type: `${resource}Author`,
  message: `Request Initiator is not the author of this ${resource}`,
});

const NotRole = (role: string) => ({
  type: `Not${role}`,
  message: `Request Initiator must have role ${role}`,
});

const ProfileNotFound = ResourceNotFound("User");

const GroupNotFound = ResourceNotFound("Group");

const PostNotFound = ResourceNotFound("Post");

const CommentNotFound = ResourceNotFound("Comment");

const TokenNotProvided = ResourceNotProvided("Token");

const PostBodyInvalid = ResourcePropInvalid("Post", "Body", "String");

const CommentBodyInvalid = ResourcePropInvalid("Comment", "Body", "String");

const PostBodySurpassMaxLength = ResourcePropSurpassMaxLength("Post", "Body");

const CommentBodySurpassMaxLength = ResourcePropSurpassMaxLength("Comment", "Body");

const GroupNameInvalid = ResourcePropInvalid("Group", "Name", "String");

const GroupTeachersInvalid = ResourcePropInvalid("Group", "Teachers", "Array");

const GroupAllowedClassesInvalid = ResourcePropInvalid("Group", "AllowedClasses", "Array");

const NotAdmin = NotRole("Admin");

const NotTeacher = NotRole("Admin");

const NotCommentAuthor = NotResourceAuthor("Comment");

const EmailInvalid = {
  type: "EmailInvalid",
  message: "Email must be a valid string",
};

const PasswordInvalid = {
  type: "PasswordInvalid",
  message: "Password must be a valid string",
};

const WrongPassword = {
  type: "WrongPassword",
  message: "Password is incorrect",
};

const RedundantAccessToken = {
  type: "RedundantAccessToken",
  message: "Access token points to invalid refresh token",
};

const EmailTaken = {
  type: "EmailTaken",
  message: "Email is already used",
};

const GroupPermission = {
  type: "GroupPersmisson",
  message: "You cannot post in this group",
};

const GroupRedactor = {
  type: "GroupRedactor",
  message: "Request Initiator must be a teacher or admin",
};

export {
  ProfileNotFound,
  GroupNotFound,
  PostNotFound,
  CommentNotFound,
  TokenNotProvided,
  PostBodyInvalid,
  CommentBodyInvalid,
  PostBodySurpassMaxLength,
  CommentBodySurpassMaxLength,
  GroupNameInvalid,
  GroupTeachersInvalid,
  GroupAllowedClassesInvalid,
  NotAdmin,
  NotTeacher,
  NotCommentAuthor,
  EmailInvalid,
  PasswordInvalid,
  WrongPassword,
  RedundantAccessToken,
  EmailTaken,
  GroupPermission,
  GroupRedactor,
};
