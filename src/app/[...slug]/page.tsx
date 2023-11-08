// export const dynamic = "force-static";

import React from "react";
import { draftMode } from "next/headers";
import { Page } from "@/payload-types";
import { resolvePathname } from "@/_utilities/resolvePathname";
import { notFound } from "next/navigation";
import PageClientTemplate from "./page.client";
import { getPathSegments } from "@/_utilities/getPathSegments";
import { getPayload } from "@/api/getPayload";

export const generateStaticParams = async () => {
  const payload = await getPayload();
  const pages = await payload.find({
    collection: "pages",
    limit: 9999,
  });

  return pages?.docs?.map((page) => ({
    slug: getPathSegments(page?.pathname),
  }));
};

const PageTemplate = async ({ params }) => {
  const payload = await getPayload();
  const { isEnabled: isDraftMode } = draftMode();

  let page: Page | null = null;

  const { slug } = params;
  const pathname = resolvePathname(slug);

  try {
    const data = await payload.find({
      collection: "pages",
      where: {
        pathname: {
          equals: pathname,
        },
      },
      depth: 2,
      draft: isDraftMode,
    });

    page = data?.docs[0] || null;
  } catch (error) {
    console.error(error);
  }

  if (!page) {
    return notFound();
  }

  return (
    <>
      <PageClientTemplate page={page} />
    </>
  );
};

export default PageTemplate;
