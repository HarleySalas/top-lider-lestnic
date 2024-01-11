import { Field } from "payload/types";
import { richText } from "./richText";
import { HeadingFeature } from "@payloadcms/richtext-lexical";
import { callToAction } from "./callToAction";

export const hero: Field = {
  name: "hero",
  interfaceName: "HeroField",
  label: {
    en: "Hero Section",
    ru: "Секция с заголовком",
  },
  type: "group",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "type",
          type: "select",
          label: {
            en: "Type",
            ru: "Тип",
          },
          required: true,
          defaultValue: "default",
          admin: {
            width: "50%",
          },
          options: [
            {
              label: {
                en: "Default",
                ru: "По умолчанию",
              },
              value: "default",
            },
            {
              label: {
                en: "Primary",
                ru: "Основной",
              },
              value: "primary",
            },
            {
              label: {
                en: "Minimal",
                ru: "Минимальный",
              },
              value: "minimal",
            },
            {
              label: {
                en: "Contact",
                ru: "Контакт",
              },
              value: "contact",
            },
          ],
        },
        {
          name: "containerSize",
          type: "select",
          label: {
            en: "Container Size",
            ru: "Размер контейнера",
          },
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
      ],
    },
    {
      name: "title",
      type: "text",
      label: {
        en: "Title",
        ru: "Заголовок",
      },
    },
    {
      name: "subtitle",
      type: "text",
      label: {
        en: "Subtitle",
        ru: "Подзаголовок",
      },
      admin: {
        condition: (_, { type } = {}) => ["primary", "contact"].includes(type),
      },
    },
    // richText(null, {
    //   features: [HeadingFeature({ enabledHeadingSizes: ["h1"] })],
    //   excludedFeatures: ["blockquote"],
    // }),
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        condition: (_, { type } = {}) => ["primary"].includes(type),
      },
    },
    {
      name: "items",
      type: "array",
      label: {
        en: "Items",
        ru: "Элементы",
      },
      labels: {
        singular: {
          en: "Item",
          ru: "Элемент",
        },
        plural: {
          en: "Items",
          ru: "Элементы",
        },
      },
      admin: {
        initCollapsed: true,
        components: {
          //@ts-expect-error
          RowLabel: ({ data, index }) =>
            data?.title || `Элемент ${String(index).padStart(2, "0")}`,
        },
        condition: (_, { type } = {}) => ["primary"].includes(type),
      },
      fields: [
        {
          name: "text",
          type: "text",
          label: {
            en: "Text",
            ru: "Текст",
          },
        },
      ],
    },
    callToAction({
      overrides: {
        admin: {
          condition: (_, { type } = {}) => ["primary"].includes(type),
        },
      },
    }),
    {
      name: "form",
      type: "relationship",
      relationTo: "forms",
      label: {
        en: "Form",
        ru: "Форма",
      },
      admin: {
        condition: (_, { type } = {}) => ["contact"].includes(type),
      },
    },
  ],
};
