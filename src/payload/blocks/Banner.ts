import type { Block } from "payload/types";
import { callToAction } from "../fields/callToAction";

export const Banner: Block = {
  slug: "banner",
  interfaceName: "BannerProps",
  labels: {
    singular: {
      en: "Banner",
      ru: "Баннер",
    },
    plural: {
      en: "Banners",
      ru: "Баннеры",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: {
        en: "Title",
        ru: "Заголовок",
      },
    },
    {
      name: "color",
      type: "select",
      label: {
        en: "Color",
        ru: "Цвет",
      },
      defaultValue: "brandPrimary",
      options: [
        {
          label: {
            en: "Brand Primary (yellow)",
            ru: "Основной бренд (желтый)",
          },
          value: "brandPrimary",
        },
        {
          label: {
            en: "Black",
            ru: "Черный",
          },
          value: "dark",
        },
      ],
    },
    callToAction(),
  ],
};
