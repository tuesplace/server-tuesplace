import twilio from "twilio";
import { CloudNotification } from "../@types/tuesplace";
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
import {
  twilioAccountSid,
  twilioApiKey,
  twilioApiKeySecret,
  twilioAuthToken,
  twilioNotifyService,
  twilioNotifyServiceCredentialSid,
} from "../config";

const twilioClient = twilio(twilioAccountSid, twilioAuthToken);

const generateTwilioAccessToken = (userId: string, videoRoom: string) => {
  const videoGrant = new VideoGrant({
    room: videoRoom,
  });

  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiKeySecret,
    {
      identity: userId,
      ttl: 86400,
    }
  );
  token.addGrant(videoGrant);
  return token.toJwt();
};

const bindDeviceToken = async (deviceToken: any, profileId: string) => {
  const binding = await twilioClient.notify.v1
    .services(twilioNotifyService)
    .bindings.create({
      identity: profileId,
      credentialSid: twilioNotifyServiceCredentialSid,
      bindingType: deviceToken.type,
      address: deviceToken.address,
    });

  return binding.sid;
};

const sendNotification = async (
  userId: string,
  notificationData: CloudNotification
) => {
  await twilioClient.notify.v1
    .services(twilioNotifyService)
    .notifications.create({
      identity: [userId],
      data: notificationData,
    });
};

const removeDeviceToken = async (binding: string) => {
  await twilioClient.notify.v1
    .services(twilioNotifyService)
    .bindings(binding)
    .remove();
};

export {
  generateTwilioAccessToken,
  bindDeviceToken,
  sendNotification,
  removeDeviceToken,
};
