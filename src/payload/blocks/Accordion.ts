import { Block } from "payload/types";
import { richText } from "../fields/richText";

export const Accordion: Block = {
  slug: "accordion",
  interfaceName: "AccordionProps",
  labels: {
    singular: {
      en: "Accordion",
      ru: "Аккордеон",
    },
    plural: {
      en: "Accordions",
      ru: "Аккордеоны",
    },
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "rows",
          type: "select",
          options: [
            {
              label: {
                en: "One",
                ru: "Один",
              },
              value: "1",
            },
            {
              label: {
                en: "Two",
                ru: "Два",
              },
              value: "2",
            },
          ],
          admin: {
            width: "50%",
          },
        },
        {
          name: "variant",
          type: "select",
          label: {
            en: "Variant",
            ru: "Вариант",
          },
          defaultValue: "default",
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
                en: "Contained",
                ru: "С контейнером",
              },
              value: "contained",
            },
            {
              label: {
                en: "Filled",
                ru: "Заполненный",
              },
              value: "filled",
            },
            {
              label: {
                en: "Separated",
                ru: "Разделенный",
              },
              value: "Separated",
            },
          ],
          admin: {
            width: "50%",
          },
        },
      ],
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
        richText(
          {
            name: "content",
            label: {
              en: "Content",
              ru: "Содержимое",
            },
          },
          {
            excludedFeatures: ["heading", "blockquote"],
          }
        ),
      ],
    },
  ],
};
