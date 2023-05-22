import zod from "zod";
import { customZodRefinement } from "../../util/zod";
import { assertInDB, assertSetLike } from "../rules";
import { Types } from "mongoose";
import { Profile } from "../resources";

export const Owners = (query = {}) =>
  zod.array(
    zod
      .string()
      .min(1)
      .superRefine(
        customZodRefinement(
          async (val) =>
            (await assertInDB(Profile, true, {
              _id: new Types.ObjectId(val),
              ...query,
            })) || assertSetLike(val)
        )
      )
  );
