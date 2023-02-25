import { faker } from "@faker-js/faker";
import { ClientSession, Types } from "mongoose";
import {
  ParsedExcelActivity,
  ParsedExcelGroup,
  ParsedExcelParent,
  ParsedExcelProfile,
  ParsedExcelRoom,
  ParsedExcelStudent,
  ParsedExcelTable,
  RoleValue,
} from "../../@types/tuesplace";
import {
  Activity,
  Parent,
  Student,
  Teacher,
  Profile,
  Group,
  Room,
  assertActivityUniqueByGroup,
  assertActivityUniqueByRoom,
} from "../../definitions";
import { NotFoundError, RESTError } from "../../errors";

const registerProfiles = async (
  profiles: (ParsedExcelParent | ParsedExcelStudent | ParsedExcelProfile)[],
  role: RoleValue,
  session?: ClientSession
): Promise<{ email: string; password: string }[]> => {
  const createdProfiles: { email: string; password: string }[] = [];

  if (role == "student") {
    const students = profiles as ParsedExcelStudent[];

    for (let i = 0; i < students.length; i += 1) {
      const { name: fullName, email } = students[i];

      if (await Profile.model.findOne({ fullName, email }, null, { session })) {
        continue;
      }

      await Profile.model.deleteOne({ fullName, email }, { session });

      const password = faker.internet.password(25);

      await Profile.model.create(
        [{ fullName, email, password, role, class: students[i].class }],
        {
          session,
        }
      );

      createdProfiles.push({ email, password });
    }
  }

  if (role == "teacher") {
    for (let i = 0; i < profiles.length; i += 1) {
      const { name: fullName, email } = profiles[i];

      if (await Profile.model.findOne({ fullName, email }, null, { session })) {
        continue;
      }

      await Profile.model.deleteOne({ fullName, email }, { session });

      const password = faker.internet.password(25);

      await Profile.model.create([{ fullName, email, password, role }], {
        session,
      });

      createdProfiles.push({ email, password });
    }
  }

  if (role == "parent") {
    const parents = profiles as ParsedExcelParent[];

    for (let i = 0; i < parents.length; i += 1) {
      const { name: fullName, email, child } = parents[i];

      if (await Profile.model.findOne({ fullName, email }, null, { session })) {
        continue;
      }

      await Profile.model.deleteOne({ fullName, email }, { session });

      const password = faker.internet.password(25);

      const parentId = (
        await Profile.model.create([{ fullName, email, password, role }], {
          session,
        })
      )[0]._id;

      const childProfile = await Profile.model.findOne(
        { fullName: child },
        null,
        { session }
      );

      await childProfile?.updateOne(
        {
          "associations.parent": {
            _id: parentId,
            collectionName: "profiles",
            shouldResolve: false,
          },
        },
        { session }
      );

      createdProfiles.push({ email, password });
    }
  }

  return createdProfiles;
};

const registerGroups = async (
  groups: ParsedExcelGroup[],
  profileId: Types.ObjectId,
  session?: ClientSession
) => {
  for (let i = 0; i < groups.length; i += 1) {
    const { name, teachers, classes, type } = groups[i];
    const groupDoc = await Group.model.findOne({ name }, null, { session });

    if (!!groupDoc) {
      continue;
    }

    await Group.model.deleteOne({ name }, { session });

    const owners = await Promise.all(
      teachers.map(async (fullName: string) => ({
        _id: (
          await Profile.model.findOne({ fullName }, null, { session })
        )?._id,
        collectionName: "profiles",
        shouldResolve: true,
      }))
    );

    await Group.model.create(
      [
        {
          name,
          owners: [
            ...owners,
            { _id: profileId, collectionName: "profiles", shouldResolve: true },
          ],
          type,
          classes,
        },
      ],
      { session }
    );
  }
};

const registerRooms = async (
  rooms: ParsedExcelRoom[],
  session: ClientSession
) => {
  for (let i = 0; i < rooms.length; i += 1) {
    const { location } = rooms[i];

    const roomDoc = await Room.model.findOne({ location }, null, { session });

    if (!!roomDoc) {
      continue;
    }

    await Room.model.create([{ location }], { session });
  }
};

const registerActivities = async (
  activities: ParsedExcelActivity[],
  session: ClientSession
) => {
  for (let i = 0; i < activities.length; i += 1) {
    const {
      group: groupName,
      room: roomLocation,
      day,
      start,
      end,
    } = activities[i];

    const group = await Group.model.findOne({ name: groupName }, null, {
      session,
    });
    const room = await Room.model.findOne({ location: roomLocation }, null, {
      session,
    });

    if (!group || !room) {
      throw new RESTError(NotFoundError(!group ? Group : Room), 404);
    }

    if (
      await Activity.model.findOne({
        "associations.group._id": group._id,
        "associations.room._id": room._id,
        day,
        start,
        end,
      })
    ) {
      continue;
    }

    const notUniqueByGroup = await assertActivityUniqueByGroup({
      group: group._id.toString(),
      day,
      start,
      end,
    });

    const notUniqueByRoom = await assertActivityUniqueByRoom({
      room: room._id.toString(),
      day,
      start,
      end,
    });

    if (!!notUniqueByGroup || !!notUniqueByRoom) {
      throw new RESTError((notUniqueByGroup || notUniqueByRoom)!, 400);
    }

    const activityDoc = await Activity.model.findOne(
      {
        day,
        start,
        end,
        "associations.group._id": group._id,
        "associations.room._id": room._id,
      },
      null,
      { session }
    );

    if (!!activityDoc) {
      continue;
    }

    await Activity.model.create(
      [
        {
          day,
          start,
          end,
          associations: {
            group: {
              _id: group._id,
              collectionName: "groups",
              shouldResolve: true,
            },
            room: {
              _id: room._id,
              collectionName: "rooms",
              shouldResolve: true,
            },
          },
        },
      ],
      { session }
    );
  }
};

export const createDocumentsFromExcelTable = async (
  { students, parents, teachers, groups, rooms, activities }: ParsedExcelTable,
  session: ClientSession,
  profileId: Types.ObjectId
): Promise<{ email: string; password: string }[]> => {
  let profiles: { email: string; password: string }[] = [];

  profiles = profiles.concat(
    await registerProfiles(students, Student.value, session)
  );

  profiles = profiles.concat(
    await registerProfiles(parents, Parent.value, session)
  );

  profiles = profiles.concat(
    await registerProfiles(teachers, Teacher.value, session)
  );

  await registerGroups(groups, profileId, session);

  await registerRooms(rooms, session);

  await registerActivities(activities, session);

  return profiles;
};
