import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (
    request.nextUrl.searchParams.get("secret") !==
    process.env.NEXT_PRIVATE_REVALIDATION_KEY
  ) {
    return NextResponse.json(
      { error: "Invalid revalidation secret.", revalidated: false },
      {
        status: 401,
      }
    );
  }

  const path = request.nextUrl.searchParams.get("path");
  const tag = request.nextUrl.searchParams.get("tag");
  const global = request.nextUrl.searchParams.get("global");

  if (global) {
    revalidatePath("/", "layout");
  }

  if (path) {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  }

  if (tag) {
    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  }

  return NextResponse.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing path, or tag to revalidate",
  });
}
