import { CloudNotification } from "./CloudNotification";
import { EmailNotification } from "./EmailNotification";

export type Notification = {
  email: EmailNotification;
  cloudMessage: CloudNotification;
};
