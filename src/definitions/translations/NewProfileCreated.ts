import { render } from "mustache";

import {
  NotificationRenderer,
  Translation,
  Notification,
} from "../../@types/tuesplace";

export class NewProfileCreated implements NotificationRenderer {
  notification: {
    email: { subject: Translation; html: Translation };
  } = {
    email: {
      subject: {
        eng: "Welcome to tuesplace",
        bg: "Добре дошли в tuesplace",
      },
      html: {
        eng: "<h1>tuesplace</h1> <br/> <h2>Hello, </h2> <br/> <p>Your temporary password for tuesplace is {{password}}</p>",
        bg: "<h1>tuesplace</h1> <br/> <h2>Здравейте, </h2> <br/> <p>Временната Ви парола за tuesplace e {{password}}</p>",
      },
    },
  };

  public render(language: string, view: { password: string }): Notification {
    return {
      email: {
        subject: render(this.notification.email.subject[language], view),
        html: render(this.notification.email.html[language], view),
        from: "tuesplace <noreply@tuesplace.com>",
      },
    };
  }
}
