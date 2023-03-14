import { ISubmission, Resource } from "../../@types/tuesplace";
import { Submission as SubmissionModel } from "../../models";

export const Submission: Resource<ISubmission> = {
  name: {
    eng: "Submission",
    bg: "Домашна Работа",
  },
  lookupFieldLocation: "params.submissionId",
  documentLocation: "resources.submission",
  by: "_id",
  model: SubmissionModel,
};
