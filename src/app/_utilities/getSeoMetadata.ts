interface GetSeoMetadataProps {
  url?: string;
}

export const getSeoMetadata = async ({ url }: GetSeoMetadataProps = {}) => {
  if (url) {
    if (process.env.BUILD_MODE !== "build") {
      const data = await fetch(`${process.env.PRIVATE_CMS_URL}${url}`).then(
        (res) => res.json()
      );

      if (data?.seo?.title || data?.seo?.description) {
        return {
          title: data?.seo?.title,
          description: data?.seo?.description,
        };
      }
    }

    return {};
  } else if (!url) {
    if (process.env.BUILD_MODE !== "build") {
      const data = await fetch(
        `${process.env.PRIVATE_CMS_URL}/api/globals/company-details`,
        { next: { tags: ["company-details"] } }
      ).then((res) => res.json());

      return {
        metadataBase: new URL("https://top-lider-lestnic.ru"),
        title: {
          default: data?.seo?.title,
          template: `%s | ${data?.seo?.title}`,
        },
        description: data?.seo?.description,
      };
    }

    return {};
  }
};
