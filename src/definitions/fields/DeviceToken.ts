import zod from "zod";
import { customZodRefinement } from "../../util/zod";
import { assertDeviceTokenType } from "../rules";

export const DeviceToken = zod.object({
  address: zod.string(),
  type: zod.string().superRefine(customZodRefinement(assertDeviceTokenType)),
});
