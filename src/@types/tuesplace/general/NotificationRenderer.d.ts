import { Notification } from "./Notification";

export interface NotificationRenderer {
  render(language: string, view: object): Notification;
}
