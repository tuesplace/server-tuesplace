import lo from "lodash";
import { Rule, Named } from "../../@types/tuesplace";

export const Unique = (
  field: Named,
  checkModel: any,
  resource: Named
): Rule => ({
  requirement: {
    eng: `${field.name.eng} has been used on another ${resource.name.eng}`,
    bg: `${field.name.bg} е бил използван от друг ${resource.name.bg}`,
  },
  assertions: [
    async (val: string) => {
      const exists = await checkModel.findOne({
        [field.name.eng.toLowerCase()]: val,
      });
      return !exists;
    },
  ],
});

export const LongerThan = (length: number): Rule => ({
  requirement: {
    eng: `{{name.eng}} must have length of at least ${length}`,
    bg: `{{name.bg}} трябва да има дължина от поне ${length}`,
  },
  assertions: [(val: any) => val.length > length],
});

export const ConformsToArray = (array: Array<any>): Rule => ({
  requirement: {
    eng: `{{name.eng}} can have one or more of the following values: [${array}]`,
    bg: `{{name.bg}} може да има следните възможни стойности: [${array}]`,
  },
  assertions: [
    (val: any) =>
      !lo.isArray(val)
        ? array.includes(val)
        : array.length >= val.length &&
          !val.filter((el) => !array.includes(el)).length,
  ],
});
