import { sendAdminEmail, sendEmail } from "./email";
import { sendNotification } from "./twilio";
import { Notification } from "../@types/tuesplace";
import { Profile } from "../models";
import { Request } from "express";
import { CreatedPost, Student } from "../definitions";
import { subject } from "./options";
import { transformError } from "../middleware";
import { NewProfileCreated } from "../definitions/translations/NewProfileCreated";

const notify = async (
  profile: { email?: string; id?: string },
  notificationData: Notification
) => {
  if (!!notificationData.cloudMessage) {
    await sendNotification(profile.id!, notificationData.cloudMessage!);
  }
  if (!!notificationData.email) {
    await sendEmail(profile.email!, notificationData.email);
  }
};

export const notifyAllGroupMembersCreatedPost = async (context: Request) => {
  if (
    context.profile!.role !== Student.value &&
    context.resources.group.type === subject
  ) {
    try {
      const profiles = (
        await Promise.all(
          context.resources.group.classes.map(
            async (userClass: string) =>
              await Profile.find({ class: userClass })
          )
        )
      )
        .flat(1)
        .map(({ email, _id, fullName }) => ({
          email,
          fullName,
          id: _id.toString(),
        }));

      for (let i = 0; i < profiles.length; i += 1) {
        await notify(
          profiles[i],
          new CreatedPost().render(context.language, {
            creator: context.profile!.fullName,
            reciever: profiles[i].fullName,
            group: context.resources.group.name,
            post: context.body.body,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export const notifyNewProfilesCreated = async (
  profiles: {
    email: string;
    password: string;
  }[],
  { id, language }: Request
) => {
  try {
    for (let i = 0; i < profiles.length; i += 1) {
      const { email, password } = profiles[i];

      await notify(
        { email },
        new NewProfileCreated().render(language, {
          password,
        })
      );
    }
  } catch (err) {
    sendAdminEmail(
      {
        ...transformError(err, language),
        stacktrace: (err as Error).stack,
      },
      { reqId: id }
    );
  }
};
