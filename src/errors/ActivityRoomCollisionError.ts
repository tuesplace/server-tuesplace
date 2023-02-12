import { TypedError } from "../@types/tuesplace";

export const ActivityRoomCollisionError: TypedError = {
  type: "ActivityRoomCollisionError",
  message: {
    eng: "This Room is used by another Activity in this timeframe",
    bg: "Тази Стая се използва от друга Дейност в това време",
  },
};
