import { CollectionConfig } from "payload/types";
import generateBlurDataURL from "../../hooks/generateBlurDataURL";

export const Gallery: CollectionConfig = {
  slug: "gallery",
  access: {
    read: () => true,
  },
  labels: {
    singular: {
      en: "Gallery Image",
      ru: "Изображение галереи",
    },
    plural: {
      en: "Gallery",
      ru: "Галерея",
    },
  },
  admin: {
    defaultColumns: ["filename", "alt"],
  },
  hooks: {
    beforeChange: [generateBlurDataURL],
  },
  upload: {
    staticURL: "/gallery",
    staticDir: "../../gallery",
    imageSizes: [
      {
        name: "blur",
        width: 32,
        height: 32,
      },
      {
        name: "thumbnail",
        width: 300,
        height: 300,
      },
      {
        name: "preview",
        width: 800,
        height: 800,
        formatOptions: {
          format: "webp",
        },
        withoutEnlargement: true,
      },
      {
        name: "landscape",
        width: 2880,
        height: 2160,
        formatOptions: {
          format: "webp",
        },
        withoutEnlargement: true,
      },
      {
        name: "portrait",
        width: 2160,
        height: 2880,
        formatOptions: {
          format: "webp",
        },
        withoutEnlargement: true,
      },
      {
        name: "square",
        width: 2160,
        height: 2160,
        formatOptions: {
          format: "webp",
        },
        withoutEnlargement: true,
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      label: {
        en: "alt",
        ru: "alt",
      },
      type: "text",
      required: true,
    },
    {
      name: "blurDataURL",
      type: "text",
      admin: {
        hidden: true,
      },
    },
  ],
};
