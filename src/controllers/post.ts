import { GroupPosts } from "../models/Post";
import Group from "../models/Group";
import { validatePost } from "../util/validators";
import reactToPostComment from "../util/reactToPostComment";
import { Request, Response } from "express";
import IPostComment from "../@types/tuesplace/IPostComment";

const getPosts = async (req: Request, res: Response, next: any) => {
  try {
    const { groupId } = req.params;
    let { page, limit } = req.query;
    if (!page) {
      page = "0";
    }
    if (!limit) {
      limit = "10";
    }
    let pageNum: number = Number(page);
    let limitNum: number = Number(limit);
    if (pageNum > 0) pageNum -= 1;
    const groupPosts = await GroupPosts(groupId)
      .find({})
      .sort({ createdAt: -1 })
      .skip(pageNum * limitNum)
      .limit(limitNum);
    res.sendRes(groupPosts);
  } catch (err) {
    next(err);
  }
};

const createPost = async (req: Request, res: Response, next: any) => {
  try {
    const { groupId } = req.params;
    const { body } = req.body;
    const { errors, valid } = validatePost(<IPostComment>{ body });
    if (!valid) {
      throw { ...errors, status: 400 };
    }

    const post = await GroupPosts(`${groupId}`).create({
      groupId,
      authorId: req.auth.userId,
      body,
    });
    res.sendRes({ ...post._doc });
  } catch (err) {
    next(err);
  }
};

const editPost = async (req: Request, res: Response, next: any) => {
  try {
    const { postId, groupId } = req.params;
    const { body } = req.body;
    const post = await GroupPosts(`${groupId}`).findById(postId);

    const { errors, valid } = validatePost(<IPostComment>{ body });
    if (!valid) {
      throw { ...errors, status: 400 };
    }

    post.body = body || "";
    await post.save();
    res.sendRes({ ...post._doc });
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req: Request, res: Response, next: any) => {
  try {
    const { postId, groupId } = req.params;
    const post = await GroupPosts(`${groupId}`).findById(postId);
    await post.deleteOne();
    res.status(204).sendRes();
  } catch (err) {
    next(err);
  }
};

const reactToPost = async (req: Request, res: Response, next: any) => {
  try {
    const { postId, groupId } = req.params;
    const { emoji } = req.body;
    const post = await GroupPosts(`${groupId}`).findById(postId);

    await reactToPostComment(post, req.auth.userId, emoji, req);

    res.status(204).sendRes();
  } catch (err) {
    next(err);
  }
};

export { getPosts, createPost, editPost, deletePost, reactToPost };
