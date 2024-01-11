// export const dynamic = "force-static";

import React from "react";
import { draftMode } from "next/headers";
import { Page } from "@/payload-types";
import { resolvePathname } from "@/_utilities/resolvePathname";
import { notFound } from "next/navigation";
import PageClientTemplate from "./page.client";
import { getPathSegments } from "@/_utilities/getPathSegments";
import { getPayload } from "@/api/getPayload";
import { Metadata, ResolvingMetadata } from "next";

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

export async function generateMetadata(
  { params },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;
  const pathname = resolvePathname(slug);

  const payload = await getPayload();

  try {
    let page;

    const data = await payload.find({
      collection: "pages",
      where: {
        pathname: {
          equals: pathname,
        },
      },
      depth: 2,
    });

    page = data?.docs[0] || null;

    return {
      title: page?.meta?.title || "TopLiderLestnic",
      description: page?.meta?.description,
    };
  } catch (error) {
    console.error(error);
  }
}

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

  console.log(page);
  return (
    <>
      <PageClientTemplate page={page} />
    </>
  );
};

export default PageTemplate;
