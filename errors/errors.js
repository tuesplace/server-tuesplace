const ResourceNotFound = (resource) => ({
  type: `${resource}NotFound`,
  message: `Resource of type ${resource} not found in database`,
});

const ResourceNotProvided = (resource) => ({
  type: `${resource}NotProvided`,
  message: `Resource of type ${resource} not provided`,
});

const ResourcePropInvalid = (resource, prop, type) => ({
  type: `${resource}${prop}Invalid`,
  message: `${prop} of ${resource} not a valid ${type}`,
});

const ResourcePropSurpassMaxLength = (resource, prop) => ({
  type: `${resource}BodySurpassMaxLength`,
  message: `${prop} of ${resource} exceeds maximum length`,
});

const NotResourceAuthor = (resource) => ({
  type: `${resource}Author`,
  message: `Request Initiator is not the author of this ${resource}`,
});

const NotRole = (role) => ({
  type: `Not${role}`,
  message: `Request Initiator must have role ${role}`,
});

module.exports = {
  ProfileNotFound: ResourceNotFound("User"),
  GroupNotFound: ResourceNotFound("Group"),
  PostNotFound: ResourceNotFound("Post"),
  CommentNotFound: ResourceNotFound("Comment"),
  TokenNotProvided: ResourceNotProvided("Token"),
  PostBodyInvalid: ResourcePropInvalid("Post", "Body", "String"),
  CommentBodyInvalid: ResourcePropInvalid("Comment", "Body", "String"),
  PostBodySurpassMaxLength: ResourcePropSurpassMaxLength("Post", "Body"),
  CommentBodySurpassMaxLength: ResourcePropSurpassMaxLength("Comment", "Body"),
  GroupNameInvalid: ResourcePropInvalid("Group", "Name", "String"),
  GroupTeachersInvalid: ResourcePropInvalid("Group", "Teachers", "Array"),
  GroupAllowedClassesInvalid: ResourcePropInvalid("Group", "AllowedClasses", "Array"),
  NotAdmin: NotRole("Admin"),
  NotTeacher: NotRole("Admin"),
  NotCommentAuthor: NotResourceAuthor("Comment"),
  EmailInvalid: {
    type: "EmailInvalid",
    message: "Email must be a valid string",
  },
  PasswordInvalid: {
    type: "PasswordInvalid",
    message: "Password must be a valid string",
  },
  WrongPassword: {
    type: "WrongPassword",
    message: "Password is incorrect",
  },
  RedundantAccessToken: {
    type: "RedundantAccessToken",
    message: "Access token points to invalid refresh token",
  },
  EmailTaken: {
    type: "EmailTaken",
    message: "Email is already used",
  },
  GroupPersmisson: {
    type: "GroupPersmisson",
    message: "You cannot post in this group",
  },
  GroupRedactor: {
    type: "GroupRedactor",
    message: "Request Initiator must be a teacher or admin",
  },
};
