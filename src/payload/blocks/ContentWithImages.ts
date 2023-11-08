import { Block } from "payload/types";
import { richText } from "../fields/richText";

export const ContentWithImages: Block = {
  slug: "contentWithImages",
  interfaceName: "ContentWithImagesProps",
  labels: {
    singular: {
      en: "Content with Images",
      ru: "Контент с изображениями",
    },
    plural: {
      en: "Content with Images",
      ru: "Контент с изображениями",
    },
  },
  fields: [
    richText(),
    {
      name: "reversed",
      type: "checkbox",
      label: {
        en: "Reverse Order",
        ru: "Обратный порядок",
      },
    },
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
      maxRows: 4,
      minRows: 1,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: {
            en: "Image",
            ru: "Изображение",
          },
        },
      ],
    },
  ],
};
