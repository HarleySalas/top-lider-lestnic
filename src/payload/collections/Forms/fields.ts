import type { Block, Field } from "payload/types";
import { richText } from "../../fields/richText";
import { LinkFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

const name: Field = {
  name: "name",
  label: {
    en: "Name",
    ru: "Имя",
  },
  admin: {
    description: {
      en: "Lowercase, without any special characters, or spaces.",
      ru: "Строчные, без специальных символов и пробелов.",
    },
  },
  type: "text",
  required: true,
};

const label: Field = {
  name: "label",
  type: "text",
  required: true,
  label: {
    en: "Label",
    ru: "Метка",
  },
};

const description: Field = {
  name: "description",
  label: {
    en: "Description",
    ru: "Описание",
  },
  type: "text",
};

const required: Field = {
  name: "required",
  label: {
    en: "Required",
    ru: "Обязательно",
  },
  type: "checkbox",
};

const width: Field = {
  name: "width",
  label: {
    en: "Field width (percentage)",
    ru: "Ширина поля (в процентах)",
  },
  type: "number",
};

const value: Field = {
  name: "value",
  label: {
    en: "Value",
    ru: "Значение",
  },
  type: "text",
  required: true,
};

const defaultValue: Field = {
  name: "defaultValue",
  label: {
    en: "Default value",
    ru: "Значение по умолчанию",
  },
  type: "text",
};

const Radio: Block = {
  slug: "radio",
  labels: {
    singular: {
      en: "Radio",
      ru: "Радио",
    },
    plural: {
      en: "Radio Fields",
      ru: "Радио поля",
    },
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          ...name,
          admin: {
            width: "50%",
          },
        },
        {
          ...label,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          ...description,
          admin: {
            width: "50%",
          },
        },
        {
          ...width,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          ...defaultValue,
          admin: {
            width: "50%",
          },
        },
        {
          name: "orientation",
          type: "radio",
          label: {
            en: "Orientation",
            ru: "Ориентация",
          },
          defaultValue: "horizontal",
          admin: {
            width: "50%",
          },
          options: [
            {
              label: {
                en: "Horizontal",
                ru: "Горизонтальный",
              },
              value: "horizontal",
            },
            {
              label: {
                en: "Vertical",
                ru: "Вертикальный",
              },
              value: "vertical",
            },
          ],
        },
      ],
    },
    {
      name: "options",
      label: {
        en: "Radio options",
        ru: "Варианты радиокнопки",
      },
      type: "array",
      labels: {
        singular: {
          en: "Option",
          ru: "Опция",
        },
        plural: {
          en: "Options",
          ru: "Опции",
        },
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              ...label,
              admin: {
                width: "50%",
              },
            },
            {
              ...value,
              admin: {
                width: "50%",
              },
            },
          ],
        },
      ],
    },
    required,
  ],
};

const Select: Block = {
  slug: "select",
  labels: {
    singular: {
      en: "Select",
      ru: "Выбрать",
    },
    plural: {
      en: "Select Fields",
      ru: "Выбрать поля",
    },
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          ...name,
          admin: {
            width: "50%",
          },
        },
        {
          ...label,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          ...description,
          admin: {
            width: "50%",
          },
        },
        {
          ...width,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          ...defaultValue,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      name: "options",
      label: {
        en: "Select attribute options",
        ru: "Выберите варианты атрибута",
      },
      type: "array",
      labels: {
        singular: {
          en: "Option",
          ru: "Опция",
        },
        plural: {
          en: "Options",
          ru: "Опции",
        },
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              ...label,
              admin: {
                width: "50%",
              },
            },
            {
              ...value,
              admin: {
                width: "50%",
              },
            },
          ],
        },
      ],
    },
    required,
  ],
};

const Text: Block = {
  slug: "text",
  labels: {
    singular: {
      en: "Text",
      ru: "Текст",
    },
    plural: {
      en: "Text Fields",
      ru: "Поля текста",
    },
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          ...name,
          admin: {
            width: "50%",
          },
        },
        {
          ...label,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          ...description,
          admin: {
            width: "50%",
          },
        },
        {
          ...width,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          ...defaultValue,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    required,
  ],
};

const Textarea: Block = {
  slug: "textarea",
  labels: {
    singular: {
      en: "Textarea",
      ru: "Текстовая область",
    },
    plural: {
      en: "Textarea fields",
      ru: "Поля текстовой области",
    },
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          ...name,
          admin: {
            width: "50%",
          },
        },
        {
          ...label,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          ...description,
          admin: {
            width: "50%",
          },
        },
        {
          ...width,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          ...defaultValue,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    required,
  ],
};

const Email: Block = {
  slug: "email",
  labels: {
    singular: {
      en: "Email",
      ru: "Email",
    },
    plural: {
      en: "Email fields",
      ru: "Email поля",
    },
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          ...name,
          admin: {
            width: "50%",
          },
        },
        {
          ...label,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          ...description,
          admin: {
            width: "50%",
          },
        },
        {
          ...width,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    required,
  ],
};

const Checkbox: Block = {
  slug: "checkbox",
  labels: {
    singular: {
      en: "Checkbox",
      ru: "Флажок",
    },
    plural: {
      en: "Checkbox fields",
      ru: "Поля флажка",
    },
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          ...name,
          admin: {
            width: "50%",
          },
        },
        {
          ...label,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          ...description,
          admin: {
            width: "50%",
          },
        },
        {
          ...width,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "defaultValue",
          label: {
            en: "Default value",
            ru: "Значение по умолчанию",
          },
          type: "checkbox",
          admin: {
            width: "50%",
          },
        },
        {
          ...required,
          admin: {
            width: "50%",
          },
        },
      ],
    },
  ],
};

const PrivacyPolicy: Block = {
  slug: "privacyPolicy",
  labels: {
    singular: {
      en: "Privacy Policy",
      ru: "Флажок",
    },
    plural: {
      en: "Checkbox fields",
      ru: "Поля флажка",
    },
  },
  fields: [
    {
      name: "label",
      type: "richText",
      // editor: lexicalEditor({
      //   features: () => [LinkFeature({})],
      // }),
    },
    // richText(),
    // { name: "label" },
    // {
    //   excludedFeatures: [
    //     "blockquote",
    //     "checkList",
    //     "heading",
    //     "indent",
    //     "orderedList",
    //     "unorderedList",
    //   ],
    // }
  ],
};

// const Message: Block = {
//   slug: 'message',
//   labels: {
//     singular: {
//       en: 'Message',
//       ru: 'Сообщение',
//     },
//     plural: {
//       en: 'Message blocks',
//       ru: 'Блоки сообщений',
//     },
//   },
//   fields: [richText()],
// }

export const fields = [
  Text,
  Email,
  Radio,
  Select,
  Checkbox,
  Textarea,
  // Message
  PrivacyPolicy,
];
