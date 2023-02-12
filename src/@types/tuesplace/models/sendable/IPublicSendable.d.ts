import { Body, Reaction } from "../..";
import { ISendable } from "./ISendable";

export interface IPublicSendable extends ISendable, Body {
  reactions: Reaction[];
}
