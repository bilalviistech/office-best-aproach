import { z } from "zod";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../config/spaces.js";
import { env } from "../../config/env.js";
import { nanoid } from "nanoid";

const schema = z.object({
  contentType: z.string().min(3),
  folder: z.string().min(1).default("listings")
});

export const presignCtrl = asyncHandler(async (req, res) => {
  const body = schema.parse(req.body);

  const ext = body.contentType.includes("png") ? "png" : "jpg";
  const key = `${body.folder}/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, "0")}/${nanoid()}.${ext}`;

  const cmd = new PutObjectCommand({
    Bucket: env.SPACES_BUCKET,
    Key: key,
    ContentType: body.contentType,
    ACL: "public-read"
  });

  const uploadUrl = await getSignedUrl(s3, cmd, { expiresIn: 60 });

  const cdnUrl = `${env.SPACES_CDN_BASE}/${key}`;

  res.json({ ok: true, uploadUrl, key, cdnUrl });
});
