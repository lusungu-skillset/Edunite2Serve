import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { createClient } from "@/lib/supabase/server";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const ALLOWED_FOLDERS = new Set([
  "edunite2serve",
  "edunite2serve/gallery",
  "edunite2serve/news",
  "edunite2serve/projects",
  "edunite2serve/team",
]);

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
    }

    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      return NextResponse.json({ error: "Sign in as an administrator to upload images." }, { status: 401 });
    }

    const { data: isAdmin, error: roleError } = await supabase.rpc("is_admin");
    if (roleError) {
      console.error("Unable to verify upload permissions:", roleError.message);
      return NextResponse.json({ error: "Unable to verify administrator permissions." }, { status: 503 });
    }
    if (!isAdmin) {
      return NextResponse.json({ error: "Only administrators can upload images." }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const requestedFolder = formData.get("folder");
    const folder = typeof requestedFolder === "string" ? requestedFolder : "edunite2serve";

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Choose an image file." }, { status: 400 });
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json({ error: "Images must be 10 MB or smaller." }, { status: 413 });
    }
    if (!ALLOWED_FOLDERS.has(folder)) {
      return NextResponse.json({ error: "The upload folder is not allowed." }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    const hasCloudinary = Boolean(cloudName) && Boolean(apiKey) && Boolean(apiSecret);

    if (!hasCloudinary) {
      return NextResponse.json(
        {
          error:
            "Cloudinary is not configured. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to your .env.local file.",
        },
        { status: 503 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadImageToCloudinary(buffer, folder);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[Cloudinary Upload Error]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed — check server logs." },
      { status: 500 }
    );
  }
}
