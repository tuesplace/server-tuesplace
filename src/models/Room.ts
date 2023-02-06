import { model, Schema } from "mongoose";
import { IRoom } from "../@types/tuesplace";

const roomSchema = new Schema<IRoom>({
  location: {
    type: String,
    required: true,
  },
});

export const Room = model("Room", roomSchema);
