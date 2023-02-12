import { ISubmission, Resource } from "../../@types/tuesplace";
import { Submission as SubmissionModel } from "../../models";

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
