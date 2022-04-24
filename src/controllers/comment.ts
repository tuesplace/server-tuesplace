import { PostComments } from "../models/Post";
import { validateComment } from "../util/validators";
import reactToPostComment from "../util/reactToPostComment";
import { RESTError } from "../errors";
import { Request, Response } from "express";
import { IPostComment } from "../@types/tuesplace/IPostComment";

const getComments = async (req: Request, res: Response, next: any) => {
  try {
    const { postId } = req.params;
    let { page, limit } = req.query;
    if (!page) {
      page = "0";
    }
    if (!limit) {
      limit = "10";
    }
    let pageNum = Number(page);
    const limitNum = Number(limit);
    if (pageNum > 0) pageNum -= 1;
    const comments = await PostComments(postId)
      .find({})
      .sort({ createdAt: -1 })
      .skip(pageNum * limitNum)
      .limit(limitNum);
    res.sendRes(comments);
  } catch (err) {
    next(err);
  }
};

const createComment = async (req: Request, res: Response, next: any) => {
  try {
    const { postId } = req.params;
    const { body } = req.body;
    const { errors, valid } = validateComment(<IPostComment>{ body });
    if (!valid) {
      throw new RESTError(errors, 400);
    }

    const comment = await PostComments(postId).create({
      authorId: req.auth.userId,
      body,
    });
    res.sendRes({ ...comment._doc });
  } catch (err) {
    next(err);
  }
};

const editComment = async (req: Request, res: Response, next: any) => {
  try {
    const { comment } = req;
    const { body } = req.body;

    const { errors, valid } = validateComment(<IPostComment>{ body });
    if (!valid) {
      throw new RESTError(errors, 400);
    }

    await comment.save();
    res.sendRes({ ...comment._doc });
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req: Request, res: Response, next: any) => {
  try {
    const { comment } = req;
    await comment.deleteOne();
    res.status(204).sendRes();
  } catch (err) {
    next(err);
  }
};

const reactToComment = async (req: Request, res: Response, next: any) => {
  try {
    const { postId, commentId } = req.params;
    const { emoji } = req.body;
    const comment = await PostComments(`${postId}`).findById(commentId);

    await reactToPostComment(comment, req.auth.userId, emoji, req);

    res.status(204).sendRes();
  } catch (err) {
    next(err);
  }
};

export {
  getComments,
  createComment,
  editComment,
  deleteComment,
  reactToComment,
};
