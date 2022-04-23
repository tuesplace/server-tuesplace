import { GroupNotFound } from "../errors";
import RESTError from "../errors/RESTError";
import Group from "../models/Group";

export default async (req, _, next) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) {
      throw new RESTError(GroupNotFound, 404);
    }
    req.group = group;

    next();
  } catch (err) {
    next(err);
  }
};
