import { Role } from "../../@types/tuesplace";

export const Admin: Role = {
  name: {
    eng: "Admin",
    bg: "Администратор",
  },
  value: "admin",
};

export const Teacher: Role = {
  name: {
    eng: "Teacher",
    bg: "Учител",
  },
  value: "teacher",
};

export const Student: Role = {
  name: {
    eng: "Student",
    bg: "Ученик",
  },
  value: "student",
};

export const Parent: Role = {
  name: {
    eng: "Parent",
    bg: "Родител",
  },
  value: "parent",
};

export const allRoles = [Admin, Teacher, Student, Parent];
