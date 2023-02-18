import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
import { Asset } from "../models";
import {
  s3AccessKey,
  s3SecretKey,
  s3BucketRegion,
  s3BucketName,
  cloudfrontURL,
  cloudfrontPrivateKey,
  cloudfrontKeypairID,
  cloudfrontDistributionId,
} from "../config";
import { Association } from "../@types/tuesplace";

export const s3Client = new S3Client({
  credentials: { accessKeyId: s3AccessKey, secretAccessKey: s3SecretKey },
  region: s3BucketRegion,
});

const cloudfrontClient = new CloudFrontClient({
  credentials: {
    accessKeyId: s3AccessKey,
    secretAccessKey: s3SecretKey,
  },
  region: s3BucketRegion,
});

export const getObjectSignedUrl = (key: string) => {
  const url = `${cloudfrontURL}${key}`;

  if (!key || !key.length) {
    return;
  }

  return getSignedUrl({
    url,
    dateLessThan: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
    privateKey: cloudfrontPrivateKey,
    keyPairId: cloudfrontKeypairID,
  });
};

export const getFileSignedUrl = async (key: string) => {
  const file = await Asset.findById(key);
  if (!file) {
    return {};
  }

  return {
    ...file._doc,
    src: getObjectSignedUrl(file.key),
    mimeType: file.mimetype,
  };
};

export const deleteObject = async (key: string) => {
  await cloudfrontClient.send(
    new CreateInvalidationCommand({
      DistributionId: cloudfrontDistributionId,
      InvalidationBatch: {
        CallerReference: key,
        Paths: {
          Quantity: 1,
          Items: ["/" + key],
        },
      },
    })
  );

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: s3BucketName,
      Key: key,
    })
  );
};

export const deleteResourceAssets = async (assets: Association[]) => {
  for (let i = 0; i < assets.length; i += 1) {
    const asset = await Asset.findByIdAndDelete(assets[i]._id);

    if (asset?.key) {
      await deleteObject(asset?.key);
    }
  }
};

export const isSignedURLExpired = (date: Date) =>
  Date.now() - date.getTime() > 1000 * 60 * 60 * 24;
