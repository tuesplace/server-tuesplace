import lo from "lodash";
import { Assets, Association, IDocument } from "../@types/tuesplace";
import { Asset } from "../models";
import { collectionToModels } from "../models/collectionToModels";
import { reduceArrayOfObject } from "./array";
import { isNumeric } from "./numbers";
import { getObjectSignedUrl, isSignedURLExpired } from "./s3";

const resolvableAttrs = ["associations", "owners", "owner", "assets"];

const mapToPublicDoc = <T>(document: IDocument<T>) =>
  lo.omit(document._doc, ["password", "verifications", "email", "createdAt"]);

const resolveAssociation = async (owner: Association) => {
  if (!Object.keys(owner).length) {
    return {};
  }

  return mapToPublicDoc(
    await collectionToModels[owner.collectionName].findById(owner._id)
  );
};

const resolveAsset = async (asset: Association) => {
  const doc = await Asset.findById(asset._id);
  if (!doc) {
    return;
  }
  if (isSignedURLExpired(doc.updatedAt) || !doc.src) {
    doc.src = getObjectSignedUrl(doc.key);
    await doc.save();
  }
  return doc._doc;
};

const refactorObject = async (
  obj: { [key: string]: any },
  resolveAttrs?: string[]
) => {
  const resolvedAttrsArr = await Promise.all(
    Object.keys(obj)
      .filter(
        (key) =>
          (resolveAttrs && resolveAttrs.includes(key)) ||
          resolvableAttrs.includes(key)
      )
      .map(async (key: string): Promise<{ [key: string]: any }> => {
        let association = obj[key] as
          | { [key: string]: Association | Association[] }
          | Association
          | Assets;
        if (key === "owner") {
          const typedAssociation = association as Association;
          const data = await resolveAssociation(typedAssociation);
          typedAssociation.data = await resolveDocuments(data, ["assets"]);
        } else if (key === "associations" || key == "owners") {
          const typedAssociation = association as {
            [key: string]: Association;
          };
          const data = await Promise.all(
            Object.keys(association)
              .filter(
                (associationKey) =>
                  typedAssociation[associationKey].shouldResolve
              )
              .map(
                async (
                  associationKey
                ): Promise<Association | { [key: string]: Association }> => {
                  const resolvedAttr = {
                    ...typedAssociation[associationKey],
                    data: await resolveDocuments(
                      await resolveAssociation(typedAssociation[associationKey])
                    ),
                  };

                  return isNumeric(associationKey)
                    ? resolvedAttr
                    : { [associationKey]: resolvedAttr };
                }
              )
          );
          if (data.length) {
            association =
              key === "associations" ? reduceArrayOfObject(data) : data;
          }
        } else if (key === "assets") {
          const typedAssociation = association as {
            [key: string]: Association[];
          };

          const data = reduceArrayOfObject(
            await Promise.all(
              Object.keys(association).map(async (key) => ({
                [key]: await Promise.all(
                  lo.isArray(typedAssociation[key])
                    ? typedAssociation[key].map(async (asset) => ({
                        ...asset,
                        data: await resolveAsset(asset),
                      }))
                    : []
                ),
              }))
            )
          );
          association = data;
        }

        return {
          [key]: lo.isArray(association)
            ? [...association]
            : { ...association },
        };
      })
  );

  return resolvedAttrsArr.length
    ? resolvedAttrsArr.reduce((obj, item) => {
        const key = Object.keys(item)[0];
        return { ...obj, [key]: item[key] };
      })
    : [];
};

export const resolveDocuments = async (
  objs: any | any[],
  resolveAttrs?: string[]
) => {
  if (!objs) {
    return;
  }

  if (lo.isArray(objs)) {
    return await Promise.all(
      objs.map(async (obj: any) => {
        return { ...obj, ...(await refactorObject(obj, resolveAttrs)) };
      })
    );
  }

  return { ...objs, ...(await refactorObject(objs, resolveAttrs)) };
};
