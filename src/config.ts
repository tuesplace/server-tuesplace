import "dotenv/config";

export const mongoDBConnectionString = process.env.MONGO_DB_CONNECTION_STRING!;
export const port = process.env.PORT || 8081;
export const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID!;
export const twilioApiKey = process.env.TWILIO_API_KEY_SID!;
export const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET!;
export const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN!;
export const twilioNotifyService = process.env.TWILIO_NOTIFY_SERVICE!;
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
export const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY!;
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;
export const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY!;
export const twilioNotifyServiceCredentialSid =
  process.env.TWILIO_NOTIFY_SERVICE_CREDENTIAL_SID!;
export const noreplyEmail = process.env.NOREPLY_EMAIL!;
export const noreplyEmailPassword = process.env.NOREPLY_EMAIL_PASSWORD!;
export const environment = process.env.ENVIRONMENT;
export const serverUrl = process.env.SERVER_URL!;
export const adminEmail = process.env.ADMIN_EMAIL!;
export const s3AccessKey = process.env.S3_ACCESS_KEY!;
export const s3SecretKey = process.env.S3_SECRET_KEY!;
export const s3BucketRegion = process.env.S3_BUCKET_REGION!;
export const s3BucketName = process.env.S3_BUCKET_NAME!;
export const cloudfrontURL = process.env.CLOUDFRONT_URL!;
export const cloudfrontPrivateKey = process.env.CLOUDFRONT_PRIVATE_KEY!;
export const cloudfrontKeypairID = process.env.CLOUDFRONT_KEYPAIR_ID!;
export const cloudfrontDistributionId = process.env.CLOUDFRONT_DISTRIBITION_ID!;
