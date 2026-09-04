import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export async function generateR2PresignedUrl(
  accountId: string,
  bucketName: string,
  key: string,
  contentType: string,
  accessKeyId?: string,
  secretAccessKey?: string
): Promise<string> {
  const endpoint = `https://${accountId}.r2.cloudflarestorage.com`;

  const s3Client = new S3Client({
    region: 'auto',
    endpoint,
    credentials: {
      accessKeyId: accessKeyId || 'dummy_access_key',
      secretAccessKey: secretAccessKey || 'dummy_secret_key',
    },
  });

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: contentType,
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 86400 }); // 24 hours (1 day)
}

export async function generateR2PresignedDownloadUrl(
  accountId: string,
  bucketName: string,
  key: string,
  fileName: string,
  accessKeyId: string,
  secretAccessKey: string,
  expiresInSec = 259200 // 3 days (72 hours)
): Promise<string> {
  const endpoint = `https://${accountId}.r2.cloudflarestorage.com`;

  const s3Client = new S3Client({
    region: 'auto',
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
    ResponseContentDisposition: `attachment; filename="${encodeURIComponent(fileName)}"`,
  });

  return await getSignedUrl(s3Client, command, { expiresIn: expiresInSec });
}
