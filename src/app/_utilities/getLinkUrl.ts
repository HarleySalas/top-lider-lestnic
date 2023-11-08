import { LinkField } from "@/payload-types";

export const getLinkUrl = (link: LinkField): string => {
  return link?.type === "internal"
    ? typeof link?.internal?.value === "string"
      ? link?.internal?.value || ""
      : link?.internal?.value?.pathname || ""
    : link?.type === "external"
    ? link?.external || ""
    : "";
};
