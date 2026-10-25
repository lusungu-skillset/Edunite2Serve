import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

export type UploadResult = {
  url: string;
  publicId: string;
  format: string;
  width: number;
  height: number;
};

/**
 * Uploads an image file to Cloudinary with automatic optimization.
 */
export async function uploadImageToCloudinary(
  fileBuffer: Buffer,
  folder = "edunite2serve"
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [
          { quality: "auto:good" },
          { fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Failed to upload image to Cloudinary"));
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height,
          });
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
}

/**
 * Optimizes a Cloudinary image URL with specified width, quality, and auto format.
 */
export function getOptimizedCloudinaryUrl(
  urlOrPublicId: string,
  width?: number
): string {
  if (!urlOrPublicId) return "";
  // If it's not a Cloudinary URL, return as-is
  if (!urlOrPublicId.includes("cloudinary.com")) return urlOrPublicId;

  const widthTransform = width ? `w_${width},` : "";
  return urlOrPublicId.replace(
    "/upload/",
    `/upload/${widthTransform}f_auto,q_auto/`
  );
}
