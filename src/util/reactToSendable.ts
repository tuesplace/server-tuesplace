import { IDocument, ISendable } from "../@types/tuesplace";

export const reactToSendable = async (
  postComment: IDocument<ISendable>,
  profileId: string,
  value: string
): Promise<void> => {
  await postComment.updateOne({
    $pull: {
      reactions: { "owner.id": profileId, value },
    },
    $push: {
      reactions: { owner: { id: profileId, model: "Profile" }, value },
    },
  });
};
