export type ParsedExcelGroup = {
  name: string;
  classes: string[];
  type: string;
  teachers: string[];
};

export type ParsedExcelActivity = {
  day: number;
  start: number;
  end: number;
  group: string;
  room: string;
};

export type ParsedExcelProfile = {
  name: string;
  email: string;
};

export type ParsedExcelParent = ParsedExcelProfile & {
  child: string;
};

export type ParsedExcelStudent = ParsedExcelProfile & {
  class: string;
};

export type ParsedExcelRoom = {
  location: string;
};

export type ParsedExcelTable = {
  groups: ParsedExcelGroup[];
  activities: ParsedExcelActivity[];
  teachers: ParsedExcelProfile[];
  parents: ParsedExcelParent[];
  students: ParsedExcelStudent[];
  rooms: ParsedExcelRoom[];
};
