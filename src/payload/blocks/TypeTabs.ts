import { Block } from "payload/types";
import { sectionTitle } from "../fields/sectionTitle";
import { richText } from "../fields/richText";
import { callToAction } from "../fields/callToAction";

export const TypeTabs: Block = {
  slug: "typeTabs",
  interfaceName: "TypeTabsProps",
  labels: {
    singular: {
      en: "Type Tabs",
      ru: "Вкладки типа",
    },
    plural: {
      en: "Type Tabs",
      ru: "Вкладки типа",
    },
  },
  fields: [
    {
      name: "tabs",
      type: "array",
      label: {
        en: "Tabs",
        ru: "Вкладки",
      },
      labels: {
        singular: {
          en: "Tab",
          ru: "Вкладка",
        },
        plural: {
          en: "Tabs",
          ru: "Вкладки",
        },
      },
      admin: {
        initCollapsed: true,
        components: {
          //@ts-expect-error
          RowLabel: ({ data, index }) =>
            data?.title || `Вкладка ${String(index).padStart(2, "0")}`,
        },
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          label: {
            en: "Title",
            ru: "Заголовок",
          },
        },
        richText({
          name: "description",
          label: {
            en: "Description",
            ru: "Описание",
          },
        }),
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: {
            en: "Image",
            ru: "Изображение",
          },
        },
        {
          name: "texture",
          type: "upload",
          relationTo: "media",
          label: {
            en: "Texture",
            ru: "Текстура",
          },
        },
        {
          name: "list",
          type: "array",
          label: {
            en: "List",
            ru: "Список",
          },
          labels: {
            singular: {
              en: "List Item",
              ru: "Элемент списка",
            },
            plural: {
              en: "List Items",
              ru: "Элементы списка",
            },
          },
          admin: {
            initCollapsed: true,
            components: {
              //@ts-expect-error
              RowLabel: ({ data, index }) =>
                data?.title || `Пункт ${String(index).padStart(2, "0")}`,
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
            richText({
              name: "description",
              label: {
                en: "Description",
                ru: "Описание",
              },
            }),
          ],
        },
      ],
    },
    callToAction(),
  ],
};
