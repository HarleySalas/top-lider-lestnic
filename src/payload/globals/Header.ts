import React, { useState, useEffect } from "react";
import { GlobalConfig } from "payload/types";
import { revalidate } from "../utilities/revalidate";
import { link } from "../fields/link";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";

export const Header: GlobalConfig = {
  slug: "header",
  label: {
    en: "Header",
    ru: "Шапка",
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
      fields: [
        link({
          withLabel: true,
        }),
      ],
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
    },
  ],
};
