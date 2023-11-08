import { LinkField, Page } from "@/payload-types";

export const getLinkLabel = (link: LinkField): string => {
  const referencedDoc = link?.internal?.value as Page;

  if (link?.label) {
    return link.label;
  }

  if (link?.type === "internal") {
    return referencedDoc?.title;
  }

  return "Отсутствует метка ссылки";
};
