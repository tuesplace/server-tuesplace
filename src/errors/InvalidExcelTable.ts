import { TypedError } from "../@types/tuesplace";

export const InvalidExcelTable: TypedError = {
  type: "InvalidExcelTable",
  message: {
    eng: "The provided Excel table had incorrect or missing data",
    bg: "Подадената Excel таблица има невалидни данни",
  },
};
