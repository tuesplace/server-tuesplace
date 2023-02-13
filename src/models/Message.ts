import { model, Schema } from "mongoose";
import { IMessage } from "../@types/tuesplace";

const messageSchema = new Schema<IMessage>({
  owner: {
    type: Object,
    required: true,
  },
  body: {
    type: String,
    default: "",
  },
  reactions: Array,
  assets: {
    type: Object,
    default: {},
  },
  associations: {
    type: Object,
    default: {},
  },
});

export const Message = model("Message", messageSchema);
