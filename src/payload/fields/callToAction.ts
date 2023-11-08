import { Field, GroupField } from "payload/types";
import { deepMerge } from "../utilities/deepMerge";
import { link } from "./link";

type CallToActionType = (options?: {
  overrides?: Partial<GroupField>;
}) => Field;

export const callToAction: CallToActionType = ({ overrides = {} } = {}) => {
  let defaultCallToAction: Field = {
    name: "callToAction",
    interfaceName: "CallToActionBlock",
    type: "group",
    admin: {
      hideGutter: true,
      ...(overrides?.admin || {}),
    },
    fields: [
      {
        name: "text",
        type: "text",
        label: {
          en: "Text",
          ru: "Текст",
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
      {
        type: "row",
        fields: [
          {
            name: "actionType",
            label: {
              en: "Action Type",
              ru: "Тип действия",
            },
            type: "select",
            defaultValue: "link",
            admin: {
              condition: (_, siblingData) => !siblingData?.disabled,
            },
            options: [
              {
                label: {
                  en: "Link",
                  ru: "Ссылка",
                },
                value: "link",
              },
              {
                label: {
                  en: "Form Modal",
                  ru: "Модальная форма",
                },
                value: "formModal",
              },
            ],
          },
          {
            name: "displayType",
            label: {
              en: "Display Type",
              ru: "Тип отображения",
            },
            type: "select",
            defaultValue: "button",
            admin: {
              condition: (_, siblingData) => !siblingData?.disabled,
            },
            options: [
              {
                label: {
                  en: "Button",
                  ru: "Кнопка",
                },
                value: "button",
              },
              {
                label: {
                  en: "Anchor",
                  ru: "Якорная ссылка",
                },
                value: "anchor",
              },
            ],
          },
        ],
      },
      {
        type: "row",
        fields: [
          {
            name: "buttonVariant",
            type: "select",
            label: {
              en: "Button Variant",
              ru: "Вариант кнопки",
            },
            defaultValue: "filled",
            options: [
              {
                label: {
                  en: "Filled",
                  ru: "Заполненная",
                },
                value: "filled",
              },
              {
                label: {
                  en: "Light",
                  ru: "Светлая",
                },
                value: "light",
              },
              {
                label: {
                  en: "Outline",
                  ru: "Контурная",
                },
                value: "outline",
              },
              {
                label: {
                  en: "Subtle",
                  ru: "Скромная",
                },
                value: "subtle",
              },
              {
                label: {
                  en: "Transparent",
                  ru: "Прозрачная",
                },
                value: "transparent",
              },
              {
                label: {
                  en: "White",
                  ru: "Белая",
                },
                value: "white",
              },
            ],
            admin: {
              width: "50%",
              condition: (_, siblingData) =>
                siblingData?.displayType === "button" && !siblingData?.disabled,
            },
          },
          {
            name: "buttonColor",
            type: "select",
            label: {
              en: "Button Color",
              ru: "Цвет кнопки",
            },
            defaultValue: "brandPrimary",
            options: [
              {
                label: {
                  en: "Brand Primary (yellow)",
                  ru: "Основной брендовый (желтый)",
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
            admin: {
              width: "50%",
              condition: (_, siblingData) =>
                siblingData?.displayType === "button" &&
                siblingData?.buttonVariant !== "white" &&
                !siblingData?.disabled,
            },
          },
          link({
            overrides: {
              admin: {
                condition: (_, siblingData) =>
                  siblingData?.actionType === "link" && !siblingData?.disabled,
              },
            },
          }),
        ],
      },
      {
        name: "form",
        type: "relationship",
        relationTo: ["forms"],
        label: {
          en: "Form",
          ru: "Форма",
        },
        admin: {
          condition: (_, siblingData) =>
            siblingData?.actionType === "formModal" && !siblingData?.disabled,
        },
      },
    ],
  };

  return deepMerge(defaultCallToAction, overrides);
};
