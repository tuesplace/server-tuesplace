import { render } from "mustache";
import { Notification, Translation } from "../../@types/tuesplace";

export interface NotificationRenderer {
  render(language: string, view: object): Notification;
}

export class CreatedPost implements NotificationRenderer {
  notification: {
    email: { subject: Translation; html: Translation; from: string };
  } = {
    email: {
      subject: {
        eng: "New Post: {{post}}",
        bg: "Нов Пост: {{post}}",
      },
      html: {
        eng: "<h1>tuesplace</h1> <br/> <h2>Hello, {{reciever}},</h2> <br/> <p>{{creator}} created a new Post in {{group}}: {{post}}</p>",
        bg: "<h1>tuesplace</h1> <br/> <h2>Здравейте, {{reciever}},</h2> <br/> <p>{{creator}} създаде нов Пост в {{group}}: {{post}}</p>",
      },
      from: "{{creator}}",
    },
  };

  public render(
    language: string,
    view: { creator: string; reciever: string; group: string; post: string }
  ): Notification {
    return {
      email: {
        subject: render(this.notification.email.subject[language], view),
        html: render(this.notification.email.html[language], view),
        from: `${view.creator} (tuesplace) <noreply@tuesplace.com>`,
      },
      cloudMessage: {
        payload: view,
      },
    };
  }
}
