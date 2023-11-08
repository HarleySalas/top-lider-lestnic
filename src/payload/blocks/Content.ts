import { Block } from "payload/types";
import { richText } from "../fields/richText";

export const Content: Block = {
  slug: "content",
  interfaceName: "ContentBlock",
  labels: {
    singular: {
      en: "Content Block",
      ru: "Блок контента",
    },
    plural: {
      en: "Content Blocks",
      ru: "Блоки контента",
    },
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "containerSize",
          type: "select",
          label: {
            en: "Container Size",
            ru: "Размер контейнера",
          },
          defaultValue: "sm",
          options: [
            {
              label: {
                en: "Extra Small",
                ru: "Очень маленький",
              },
              value: "xs",
            },
            {
              label: {
                en: "Small",
                ru: "Маленький",
              },
              value: "sm",
            },
            {
              label: {
                en: "Medium",
                ru: "Средний",
              },
              value: "md",
            },
            {
              label: {
                en: "Large",
                ru: "Большой",
              },
              value: "lg",
            },
            {
              label: {
                en: "Extra Large",
                ru: "Очень большой",
              },
              value: "xl",
            },
          ],
        },
        {
          name: "theme",
          type: "select",
          label: {
            en: "Theme",
            ru: "Тема",
          },
          defaultValue: "light",
          options: [
            {
              label: {
                en: "Light",
                ru: "Светлая",
              },
              value: "light",
            },
            {
              label: {
                en: "Dark",
                ru: "Темная",
              },
              value: "dark",
            },
          ],
        },
      ],
    },
    richText(),
  ],
};
