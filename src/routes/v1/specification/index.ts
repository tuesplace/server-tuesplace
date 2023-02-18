import express from "express";
import {
  createAssets,
  createResource,
  editResourceAssets,
  getAllResource,
  getResource,
  parseSpecificationCSV,
} from "../../../controllers";
import { Specification } from "../../../definitions";
import { verifyBodySchema, verifyResourceExists } from "../../../middleware";
import { createSpecificationSchema } from "../../../requestSchema/specification";

const router = express.Router({ mergeParams: true });

router.get("/", getAllResource(Specification));

router.get(
  "/:specificationId",
  verifyResourceExists(Specification),
  getResource(Specification)
);

router.put(
  "/:specificationId/assets",
  verifyResourceExists(Specification),
  createAssets(
    {
      resolveAttrs: (req) => ({
        owner: {
          _id: req.profile._id,
          collectionName: "profiles",
          shouldResolve: true,
        },
      }),
    },
    Specification,
    [
      {
        name: "specification",
        maxCount: 1,
        mimetype:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ]
  ),
  parseSpecificationCSV,
  editResourceAssets(Specification, { ignoreMode: true })
);

router.post(
  "/",
  verifyBodySchema(createSpecificationSchema),
  createResource(Specification)
);

export { router as specificationRouter };
