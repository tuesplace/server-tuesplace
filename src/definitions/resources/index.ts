import {
  IActivity,
  IComment,
  IGroup,
  IMark,
  IPost,
  IProfile,
  IRefreshTokenGroup,
  IRoom,
  ISubmission,
  Named,
  Resource,
} from "../../@types/tuesplace";

import {
  Profile as ProfileModel,
  Post as PostModel,
  Mark as MarkModel,
  Group as GroupModel,
  Comment as CommentModel,
  RefreshTokenGroup as RefreshTokenGroupModel,
  Activity as ActivityModel,
  Room as RoomModel,
  Submission as SubmissionModel,
} from "../../models/";

export const Token: Named = {
  name: {
    eng: "Token",
    bg: "Тоукън",
  },
};

export const Post: Resource<IPost> = {
  name: {
    eng: "Post",
    bg: "Пост",
  },
  lookupFieldLocation: "params.postId",
  documentLocation: "resources.post",
  by: "_id",
  model: PostModel,
};

export const Profile: Resource<IProfile> = {
  name: {
    eng: "Profile",
    bg: "Профил",
  },
  lookupFieldLocation: "params.profileId",
  documentLocation: "profile",
  by: "_id",
  model: ProfileModel,
};

export const Mark: Resource<IMark> = {
  name: {
    eng: "Mark",
    bg: "Оценка",
  },
  lookupFieldLocation: "params.markId",
  documentLocation: "resources.mark",
  by: "_id",
  model: MarkModel,
};

export const RefreshTokenGroup: Resource<IRefreshTokenGroup> = {
  name: {
    eng: "RefreshTokenGroup",
    bg: "RefreshTokenGroup",
  },
  lookupFieldLocation: "",
  documentLocation: "resources.refreshTokenGroup",
  by: "_id",
  model: RefreshTokenGroupModel,
};

export const Group: Resource<IGroup> = {
  name: {
    eng: "Group",
    bg: "Група",
  },
  lookupFieldLocation: "params.groupId",
  documentLocation: "resources.group",
  by: "_id",
  model: GroupModel,
};

export const Comment: Resource<IComment> = {
  name: {
    eng: "Comment",
    bg: "Коментар",
  },
  lookupFieldLocation: "params.commentId",
  documentLocation: "resources.comment",
  by: "_id",
  model: CommentModel,
};

export const StudentResource: Resource<IProfile> = {
  ...Profile,
  lookupFieldLocation: "params.studentId",
  documentLocation: "resources.student",
};

export const Activity: Resource<IActivity> = {
  name: {
    eng: "Activity",
    bg: "Дейност",
  },
  lookupFieldLocation: "params.activityId",
  documentLocation: "resources.activity",
  by: "_id",
  model: ActivityModel,
};

export const Room: Resource<IRoom> = {
  name: {
    eng: "Room",
    bg: "Стая",
  },
  lookupFieldLocation: "params.roomId",
  documentLocation: "resources.room",
  by: "_id",
  model: RoomModel,
};

export const Submission: Resource<ISubmission> = {
  name: {
    eng: "Submission",
    bg: "Домашна Работа",
  },
  lookupFieldLocation: "params.submissionId",
  documentLocation: "resourdes.submission",
  by: "_id",
  model: SubmissionModel,
};
