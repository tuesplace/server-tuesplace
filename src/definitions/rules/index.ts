import lo from "lodash";
import { Types } from "mongoose";
import { Resource } from "../../@types/tuesplace";
import {
  PasswordPolicyError,
  InvalidTypeError,
  InvalidRangeError,
  NotUniqueError,
  NotConformToArrayError,
  ArrayElementsNotUniqueError,
  NotFoundError,
  ActivityRoomCollisionError,
  ActivityGroupCollisionError,
  InvalidValueError,
  InArrayError,
} from "../../errors";
import { EmailName } from "../names";
import { Activity } from "../resources";

export const assertEmailLike = (value: string) => {
  const emailRegEx =
    // eslint-disable-next-line no-control-regex
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  return !value.match(emailRegEx)
    ? InvalidTypeError(EmailName, EmailName.name)
    : null;
};

export const assertPasswordLike = (value: string) => {
  const regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)/;
  return !value.match(regExPass) || value.length < 7
    ? PasswordPolicyError
    : null;
};

export const assertActivityUniqueByGroup = async (val: {
  group: string;
  day: number;
  start: number;
  end: number;
}) =>
  (await assertInDB(Activity, false, {
    $or: [
      {
        "associations.group._id": new Types.ObjectId(val.group),
        day: val.day,
        start: {
          $gte: val.start,
        },
        end: {
          $lte: val.end,
        },
      },
      {
        "associations.group._id": new Types.ObjectId(val.group),
        day: val.day,
        start: {
          $lte: val.start,
        },
        end: {
          $gte: val.start,
        },
      },
      {
        "associations.group._id": new Types.ObjectId(val.group),
        day: val.day,
        start: {
          $lte: val.start,
        },
        end: {
          $gte: val.end,
        },
      },
      {
        "associations.group._id": new Types.ObjectId(val.group),
        day: val.day,
        start: {
          $gte: val.start,
        },
        end: {
          $gte: val.end,
        },
      },
    ],
  }))
    ? ActivityGroupCollisionError
    : null;

export const assertActivityUniqueByRoom = async ({
  room,
  day,
  start,
  end,
}: {
  room: string;
  day: number;
  start: number;
  end: number;
}) =>
  (await assertInDB(Activity, false, {
    $or: [
      {
        "associations.room._id": new Types.ObjectId(room),
        day: day,
        start: {
          $gte: start,
        },
        end: {
          $lte: end,
        },
      },
      {
        "associations.room._id": new Types.ObjectId(room),
        day: day,
        start: {
          $lte: start,
        },
        end: {
          $gte: start,
        },
      },
      {
        "associations.room._id": new Types.ObjectId(room),
        day: day,
        start: {
          $lte: start,
        },
        end: {
          $gte: end,
        },
      },
      {
        "associations.room._id": new Types.ObjectId(room),
        day: day,
        start: {
          $gte: start,
        },
        end: {
          $gte: end,
        },
      },
    ],
  }))
    ? ActivityRoomCollisionError
    : null;

export const assertNumberInRange = (
  lessThan: number,
  val: number,
  moreThan = 0
) =>
  !(val > moreThan && val < lessThan)
    ? InvalidRangeError(moreThan, lessThan)
    : null;

export const assertLengthInRange = (
  lessThan: number,
  val: string | any[],
  moreThan = 0
) =>
  !(val.length > moreThan && val.length < lessThan)
    ? InvalidRangeError(moreThan, lessThan)
    : null;

export const assertConformsToArray = (array: any[], val: any) => {
  const conforms = !lo.isArray(val)
    ? array.includes(val)
    : array.length >= val.length &&
      !val.filter((el) => !array.includes(el)).length;

  return !conforms ? NotConformToArrayError(array) : null;
};

export const assertSetLike = (val: any[]) =>
  new Set(val).size !== val.length ? ArrayElementsNotUniqueError : null;

export const assertInDB = async <T>(
  resource: Resource<T>,
  shoulbBeInDB: boolean,
  query: object
) => {
  const exists = await resource.model.find(query);
  if (shoulbBeInDB && (!exists || !exists.length)) {
    return NotFoundError(resource);
  }
  if (!shoulbBeInDB && exists.length) {
    return NotUniqueError(resource);
  }
  return null;
};

export const assertDeviceTokenType = (val: string) =>
  val !== "apn" &&
  val !== "gcm" &&
  val !== "sms" &&
  val !== "fcm" &&
  val !== "facebook-messenger" &&
  val !== "alexa"
    ? InvalidValueError("'apn'|'gcm'|'sms'|'fcm'|'facebook-messenger'|'alexa'")
    : null;

export const assertMoreThan = (val: number, moreThan: number) =>
  val < moreThan ? InvalidRangeError(moreThan) : null;

export const assertNotInArray = <T>(arr: T[], val: T) =>
  !!arr.find((el) => el === val) ? InArrayError(val) : null;
