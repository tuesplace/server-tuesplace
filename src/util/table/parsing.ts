import axios from "axios";
import lo from "lodash";
import XLSX from "xlsx";

import { ParsedExcelTable, ResolvedMulterFile } from "../../@types/tuesplace";
import { ParsedExcelTable as ParsedExcelTableSchema } from "../../definitions";
import { InvalidExcelTable, RESTError } from "../../errors";
import { reduceArrayOfObject } from "../array";
import { getObjectSignedUrl } from "../s3";
import { parseZodError } from "../zod";

const parseDay = (day: string) => {
  const days: {
    [key: string]: number;
  } = {
    понеделник: 1,
    вторник: 2,
    сряда: 3,
    четвъртък: 4,
    петък: 5,
    събота: 6,
    неделя: 7,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7,
  };

  return days[day] || 1;
};

const parseTime = (data: string, key: "day" | "start" | "end") => {
  if (key != "day") {
    return data.split(":").length
      ? data
          .split(":")
          .map((time: string) => parseInt(time))
          .reduce((prev, curr) => prev * 60 + curr)
      : [];
  }

  return parseDay(data.toLowerCase().trim());
};

const translateKey = (key: string): string => {
  const localizedKeys: { [key: string]: string } = {
    име: "name",
    класове: "classes",
    мейл: "email",
    имейл: "email",
    клас: "class",
    тип: "type",
    учители: "teachers",
    ден: "day",
    старт: "start",
    начало: "start",
    край: "end",
    група: "group",
    стая: "room",
    дете: "child",
    локация: "location",
  };

  return localizedKeys[key.toLowerCase()] || key;
};

const translateGroupType = (type: string) => {
  const localizedKeys: { [key: string]: string } = {
    предмет: "subject",
    чат: "chat",
  };

  const groupTypes = ["subject", "chat"];

  return localizedKeys[type] || groupTypes.includes(type) ? type : "subject";
};

const parseObjectData = (translatedKey: string, data: any): any => {
  switch (translatedKey) {
    case "classes":
    case "teachers":
      return data.split(";").map((val: string) => val.trim());
    case "day":
    case "start":
    case "end":
      return parseTime(data, translatedKey);
    case "type":
      return translateGroupType(data);
    default:
      return lo.isString(data) ? data.trim() : data;
  }
};

const parseSheetData = (obj: any) =>
  reduceArrayOfObject(
    Object.keys(obj).map((key) => {
      const translatedKey = translateKey(key.toLowerCase());
      return {
        [translatedKey]: parseObjectData(translatedKey, obj[key].trim()),
      };
    })
  );

const getTableData = async (src: string | undefined) =>
  src ? (await axios.get(src!, { responseType: "arraybuffer" })).data : {};

const prettifySheet = (sheet: any) => ({
  [Object.keys(sheet)[0].trim().toLowerCase()]:
    sheet[Object.keys(sheet)[0]].map(parseSheetData),
});

const translateSheetName = (sheetName: string): string => {
  const localizedSheetNames: { [key: string]: string } = {
    ученици: "students",
    групи: "groups",
    учители: "teachers",
    родители: "parents",
    дейности: "activities",
    стаи: "rooms",
  };

  return (
    localizedSheetNames[sheetName.trim().toLowerCase()] ||
    sheetName.trim().toLowerCase()
  );
};

const parseTableData = (data: any) => {
  const sheetNames = [
    "groups",
    "parents",
    "students",
    "activities",
    "teachers",
    "rooms",
  ];

  return data.SheetNames.filter((val: string) =>
    sheetNames.includes(translateSheetName(val))
  )
    .map((sheetName: string) => ({
      [translateSheetName(sheetName)]: XLSX.utils.sheet_to_json(
        data.Sheets[sheetName]
      ),
    }))
    .map(prettifySheet);
};

const verifyParsedTable = async (
  parsedTable: ParsedExcelTable
): Promise<ParsedExcelTable> => {
  const verificationResult = await ParsedExcelTableSchema.safeParseAsync(
    parsedTable
  );

  if (!verificationResult.success) {
    const typedErrors = parseZodError(verificationResult);
    throw new RESTError(
      typedErrors.length ? typedErrors : InvalidExcelTable,
      400
    );
  }

  return parsedTable;
};

export const parseSpecificationExcelTables = async (
  files: ResolvedMulterFile[]
): Promise<ParsedExcelTable> =>
  verifyParsedTable(
    reduceArrayOfObject(
      (
        await Promise.all(
          files
            .map((file) => file.key)
            .filter((key) => !!key)
            .map(getObjectSignedUrl)
            .map(getTableData)
        )
      )
        .map((data) => XLSX.read(data, { type: "array" }))
        .map(parseTableData)
        .at(0)
    )
  );
