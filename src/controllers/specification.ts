import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import {
  createDocumentsFromExcelTable,
  notifyNewProfilesCreated,
  parseSpecificationExcelTables,
} from "../util";

export const parseSpecificationCSV = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const { resolvedFiles: excelFiles } = req;

      const profiles = await createDocumentsFromExcelTable(
        await parseSpecificationExcelTables(excelFiles),
        session,
        req.profile._id
      );

      notifyNewProfilesCreated(profiles, req);

      res.sendRes(null, 204);
    });
  } catch (err) {
    next(err);
  } finally {
    session.endSession();
  }
};
