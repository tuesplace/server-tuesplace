import mongoose, { ObjectId, Types } from "mongoose";
import { IDocument, ISendable, Reaction } from "../@types/tuesplace";

export const reactToSendable = async (
  sendable: IDocument<ISendable>,
  profileId: ObjectId,
  value: string
): Promise<void> => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      if (
        sendable.reactions.findIndex(
          (reaction: Reaction) =>
            reaction.owner._id.toString() == profileId.toString() &&
            reaction.value == value
        ) != -1
      ) {
        await sendable.updateOne({
          $pull: {
            reactions: {
              "owner._id": {
                $eq: new Types.ObjectId("637a5330ff6cf3593c351d1c"),
              },
              value,
            },
          },
        });
      } else {
        await sendable.updateOne({
          $push: {
            reactions: {
              owner: {
                _id: profileId,
                collectionName: "profiles",
                shouldResolve: true,
              },
              value,
            },
          },
        });
      }
    });
  } finally {
    session.endSession();
  }
};
