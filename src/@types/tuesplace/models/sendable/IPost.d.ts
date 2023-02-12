import { Assignment } from "../..";
import { IPublicSendable } from "./IPublicSendable";

export interface IPost extends IPublicSendable {
  assignmentInfo?: Assignment;
}
