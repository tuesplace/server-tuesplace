import { Resource } from "../../@types/tuesplace";
import { IMessage } from "../../@types/tuesplace/models/sendable/IMessage";
import { Message as MessageModel } from "../../models";

export const Message: Resource<IMessage> = {
  name: {
    eng: "Message",
    bg: "Съобщение",
  },
  lookupFieldLocation: "params.messageId",
  documentLocation: "resources.message",
  by: "_id",
  model: MessageModel,
};
