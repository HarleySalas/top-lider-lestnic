import seo from "@payloadcms/plugin-seo";

export const PayloadPluginSeo = () =>
  seo({
    collections: ["pages"],
    generateTitle: ({ doc }) => {
      // @ts-expect-error
      return doc?.title?.value;
    },
    generateURL: ({ doc, locale }) => {
      return `https://top-lider-lestnic.ru${
        // @ts-expect-error
        doc?.fields?.pathname?.value
      }`;
    },
    uploadsCollection: "media",
  });
