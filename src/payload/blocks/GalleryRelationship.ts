import { Block } from "payload/types";
import { populateGalleryImages } from "../hooks/populateGalleryImages";

export const GalleryRelationship: Block = {
  slug: "galleryRelationship",
  interfaceName: "GalleryRelationshipProps",
  labels: {
    singular: {
      en: "Gallery",
      ru: "Галерея",
    },
    plural: {
      en: "Gallery",
      ru: "Галерея",
    },
  },
  fields: [
    {
      name: "displayType",
      type: "select",
      required: true,
      defaultValue: "mosaic",
      options: [
        {
          label: {
            en: "Mosaic",
            ru: "Мозаика",
          },
          value: "mosaic",
        },
      ],
    },
    {
      name: "galleryImages",
      type: "json",
      hooks: {
        afterRead: [populateGalleryImages],
      },
      admin: {
        hidden: true,
      },
    },
  ],
};
