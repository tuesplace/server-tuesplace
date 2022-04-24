import { Response } from "express";

export default (_: any, res: Response, next: any) => {
  res.sendRes = (response: any) => {
    res.send({ success: true, response });
  };
  next();
};
