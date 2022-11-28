import { Translation } from "../@types/tuesplace";
import Mustache from "mustache";

export const renderTranslation = (
  translation: Translation,
  view: any
): Translation => {
  const copy: Translation = { ...translation };

  Object.keys(translation).forEach((key: string) => {
    copy[key] = Mustache.render(copy[key], view);
  });
  return copy;
};
