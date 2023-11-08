"use client";

import type { CollectionConfig } from "payload/types";
import generateBlurDataURL from "../../hooks/generateBlurDataURL";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  labels: {
    singular: {
      en: "Media",
      ru: "Медиа",
    },
    plural: {
      en: "Media",
      ru: "Медиа",
    },
  },
  hooks: {
    beforeChange: [generateBlurDataURL],
  },
  upload: {
    staticURL: "/media",
    staticDir: "../../media",
    crop: true,
    focalPoint: true,
    formatOptions: {
      format: "webp",
      options: {
        quality: 85,
      },
    },
    imageSizes: [
      {
        name: "blur",
        width: 32,
        height: 32,
        formatOptions: {
          format: "png",
        },
      },
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        formatOptions: {
          format: "webp",
        },
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
