import { Field } from "payload/types";

export const sectionTitle: Field = {
  name: "sectionTitle",
  interfaceName: "SectionTitleProps",
  label: {
    en: "Section Title",
    ru: "Заголовок раздела",
  },
  type: "group",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: {
        en: "Title",
        ru: "Заголовок",
      },
      admin: {
        condition: (_, siblingData) => !siblingData?.disabled,
      },
    },
    {
      name: "description",
      type: "text",
      label: {
        en: "Description",
        ru: "Описание",
      },
      admin: {
        condition: (_, siblingData) => !siblingData?.disabled,
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
        condition: (_, siblingData) => !siblingData?.disabled,
      },
    },
    {
      name: "disabled",
      type: "checkbox",
      label: {
        en: "Disable",
        ru: "Отключить",
      },
    },
  ],
};
