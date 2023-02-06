import zod from "zod";
import { assertInDB, Room } from "../definitions";
import { customZodRefinement } from "../util/zod";

export const roomSchema = zod.object({
  location: zod
    .string()
    .superRefine(
      customZodRefinement((val) => assertInDB(Room, false, { location: val }))
    ),
});
