import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import {
  accessTokenExpiry,
  accessTokenSecret,
  refreshTokenExpiry,
  refreshTokenSecret,
} from "../config";

import { RefreshTokenGroup } from "../models";

import { Request } from "express";
import { NotProvidedError, RESTError } from "../errors";
import mongoose from "mongoose";
import { Token } from "../definitions";
import { IDocument, IRefreshTokenGroup } from "../@types/tuesplace";

const getToken = (req: Request, secret: string) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new RESTError(NotProvidedError(Token), 400);
  }
  const token = authHeader.split("Bearer ")[1].trim();
  const tokenPayload = jwt.verify(token, secret) as JwtPayload;
  return tokenPayload;
};

const rotateTokenPair = async (req: Request) => {
  const { userId, refreshTokenGroupId, id } = getToken(req, refreshTokenSecret);
  const refreshTokenGroup = await verifyRefreshToken(refreshTokenGroupId, id);
  const { token: refreshToken, id: refreshTokenId } = await rotateRefreshToken(
    refreshTokenGroup,
    userId,
    id
  );

  return {
    accessToken: jwt.sign(
      { userId, refreshTokenGroupId, refreshTokenIssuerId: refreshTokenId },
      accessTokenSecret,
      { expiresIn: accessTokenExpiry }
    ),
    refreshToken,
    userId,
  };
};

const verifyAccessToken = async (req: Request) => {
  const { userId, refreshTokenGroupId, refreshTokenIssuerId } = getToken(
    req,
    accessTokenSecret
  );

  await verifyRefreshToken(refreshTokenGroupId, refreshTokenIssuerId);

  return userId;
};

const rotateRefreshToken = async (
  refreshTokenGroup: IDocument<IRefreshTokenGroup>,
  userId: string,
  refreshTokenId: string
) => {
  refreshTokenGroup.usedRefreshTokens.push(refreshTokenId);
  await refreshTokenGroup.save();

  const id = new mongoose.Types.ObjectId().toString();

  return {
    token: jwt.sign(
      {
        refreshTokenGroupId: refreshTokenGroup._doc._id.toString(),
        userId,
        id: id,
      },
      refreshTokenSecret,
      { expiresIn: refreshTokenExpiry }
    ),
    id: id,
  };
};

const verifyRefreshToken = async (
  refreshTokenGroupId: string,
  refreshTokenIssuerId: string
) => {
  const refreshTokenGroup = await RefreshTokenGroup.findById(
    refreshTokenGroupId
  );
  if (!refreshTokenGroup) {
    throw new TokenExpiredError("Refresh Token Expired", new Date());
  }
  if (refreshTokenGroup.usedRefreshTokens.includes(refreshTokenIssuerId)) {
    await refreshTokenGroup.deleteOne();
    throw new TokenExpiredError("Refresh Token Expired", new Date());
  }

  return refreshTokenGroup;
};

const generateTokenPair = async (userId: string) => {
  const refreshTokenGroup = new RefreshTokenGroup({
    owner: {
      _id: new mongoose.Types.ObjectId(userId),
      collectionName: "profiles",
    },
  });
  await refreshTokenGroup.save();
  const refreshTokenId = new mongoose.Types.ObjectId();
  const refreshToken = jwt.sign(
    {
      refreshTokenGroupId: refreshTokenGroup._id.toString(),
      userId,
      id: refreshTokenId,
    },
    refreshTokenSecret,
    { expiresIn: refreshTokenExpiry }
  );

  const accessToken = jwt.sign(
    {
      userId,
      refreshTokenGroupId: refreshTokenGroup._id.toString(),
      refreshTokenIssuerId: refreshTokenId,
    },
    accessTokenSecret,
    { expiresIn: accessTokenExpiry }
  );

  return { refreshToken, accessToken };
};

export { getToken, rotateTokenPair, verifyAccessToken, generateTokenPair };
