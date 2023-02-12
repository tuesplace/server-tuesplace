import { customZodRefinement } from "../../util/zod";
import { Profile } from "../resources";
import { assertInDB } from "../rules";
import { Email } from "./Email";

export const UniqueEmail = Email.superRefine(
  customZodRefinement(
    async (email) => await assertInDB(Profile, false, { email })
  )
);
