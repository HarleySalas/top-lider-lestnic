import { Block } from "payload/types";
import { callToAction } from "../fields/callToAction";

export const GalleryPreview: Block = {
  slug: "galleryPreview",
  interfaceName: "GalleryPreviewBlock",
  labels: {
    singular: {
      en: "Gallery Preview Block",
      ru: "Блок предпросмотра галереи",
    },
    plural: {
      en: "Gallery Preview Blocks",
      ru: "Блоки предпросмотра галереи",
    },
  },
  fields: [
    {
      name: "images",
      type: "array",
      labels: {
        singular: {
          en: "Image",
          ru: "Изображение",
        },
        plural: {
          en: "Images",
          ru: "Изображения",
        },
      },
      admin: {
        initCollapsed: true,
        components: {
          //@ts-expect-error
          RowLabel: ({ index }) =>
            `Изображение ${String(index).padStart(2, "0")}`,
        },
      },
      maxRows: 15,
      minRows: 3,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "gallery",
          label: {
            en: "Image",
            ru: "Изображение",
          },
        },
      ],
    },
    callToAction(),
  ],
};
