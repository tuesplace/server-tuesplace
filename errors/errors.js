const ResourceNotFound = (resource) => ({
  type: `${resource}NotFound`,
  message: `Resource of type ${resource} not found in database`,
});

const ResourceNotProvided = (resource) => ({
  type: `${resource}NotProvided`,
  message: `Resource of type ${resource} not provided`,
});

const ResourceBodyInvalid = (resource) => ({
  type: `${resource}BodyInvalid`,
  message: `Body of ${resource} not a valid string`,
});

const ResourceBodySurpassMaxLength = (resource) => ({
  type: `${resource}BodySurpassMaxLength`,
  message: `Body of ${resource} exceeds maximum length`,
});

const NotResourceAuthor = (resource) => ({
  type: `${resource}Author`,
  message: `Request Initiator is not the author of this ${resource}`,
});

module.exports = {
  ProfileNotFound: ResourceNotFound("User"),
  GroupNotFound: ResourceNotFound("Group"),
  PostNotFound: ResourceNotFound("Post"),
  CommentNotFound: ResourceNotFound("Comment"),
  TokenNotProvided: ResourceNotProvided("Token"),
  PostBodyInvalid: ResourceBodyInvalid("Post"),
  CommentBodyInvalid: ResourceBodyInvalid("Comment"),
  PostBodySurpassMaxLength: ResourceBodySurpassMaxLength("Post"),
  CommentBodySurpassMaxLength: ResourceBodySurpassMaxLength("Comment"),
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
};
