import { GlobalConfig } from "payload/types";
import { revalidate } from "../utilities/revalidate";
import { link } from "../fields/link";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: {
    en: "Footer",
    ru: "Нижний колонтитул",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: "Settings",
      ru: "Настройки",
    },
    // livePreview: {
    //   url: process.env.PAYLOAD_PUBLIC_SERVER_URL,
    // },
  },
  hooks: {
    afterChange: [
      ({ req, doc }) => {
        revalidate({ req, doc, type: "path", value: "/", global: true });
      },
    ],
  },
  fields: [
    {
      name: "links",
      type: "array",
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return (
              data?.link?.label || `Метка ${String(index).padStart(2, "0")}`
            );
          },
        },
      },
      label: {
        en: "Links",
        ru: "Ссылки",
      },
      fields: [link({ withLabel: true })],
    },
    link({
      overrides: {
        name: "legal",
        label: {
          en: "Legal Information Link",
          ru: "Ссылка на юридическую информацию",
        },
      },
      withLabel: true,
    }),
    {
      name: "legalWarning",
      type: "text",
      label: {
        en: "Legal Warning",
        ru: "Правовое предупреждение",
      },
    },
  ],
};
