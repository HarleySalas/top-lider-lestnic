"use client";

import { Hero } from "@/_components/Hero";
import { Page } from "@/payload-types";
import React from "react";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { RenderBlocks } from "@/_components/RenderBlocks/RenderBlocks";
// import { useGlobalsContext } from "@/modules/ClientProvider/GlobalsProvider";
import { Breadcrumb } from "@payloadcms/plugin-nested-docs/dist/types";
import { AppShell, RemoveScroll } from "@mantine/core";

const PageClientTemplate = ({ page }: { page: Page }) => {
  const { data } = useLivePreview({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
    depth: 2,
    initialData: page,
  });

  // const data = page;
  return (
    <AppShell.Main
      pl={0}
      pr={0}
      pb={0}
      // className={RemoveScroll.classNames.fullWidth}
    >
      <Hero hero={data?.hero} breadcrumbs={data?.breadcrumbs as Breadcrumb[]} />
      <RenderBlocks blocks={data?.blocks} />
    </AppShell.Main>
  );
};

export default PageClientTemplate;
