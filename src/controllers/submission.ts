import { Request, Response, NextFunction } from "express";
import { Mark, Submission } from "../models";
import { resolveDocuments } from "../util";

export const getAllSubmissionsWithMarksPaginated =
  (filterByOwner: boolean) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = req.query;
      let pageNum = Number(page || 0);
      const limitNum = Number(limit || 10);

      if (pageNum > 0) pageNum -= 1;
      const submissions = await Submission.find(
        filterByOwner
          ? {
              "associations.group._id": req.ids!.groupId,
              "associations.post._id": req.ids!.postId,
              "owner._id": req.profile._id,
            }
          : {
              "associations.group._id": req.ids!.groupId,
              "associations.post._id": req.ids!.postId,
            }
      )
        .sort({ createdAt: -1 })
        .skip(pageNum * limitNum)
        .limit(limitNum);

      console.log((await Mark.find({})).map((mark) => mark._doc));

      const documents = await Promise.all(
        submissions.map(async (submission) => ({
          ...submission._doc,
          marks: await resolveDocuments(
            (
              await Mark.find({
                "associations.submission._id": submission._id,
              })
            ).map((mark) => mark._doc),
            ["owner"]
          ),
        }))
      );

      res.sendRes(documents);
    } catch (err) {
      next(err);
    }
  };
