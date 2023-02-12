import { IRoom, Resource } from "../../@types/tuesplace";
import { Room as RoomModel } from "../../models";

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
