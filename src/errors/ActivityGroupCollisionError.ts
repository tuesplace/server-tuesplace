import { TypedError } from "../@types/tuesplace";

export const ActivityGroupCollisionError: TypedError = {
  type: "ActivityGroupCollisionError",
  message: {
    eng: "This Group is assigned to another Activity in this timeframe",
    bg: "Тази Група е предназначена за друга Дейност в това време",
  },
};
