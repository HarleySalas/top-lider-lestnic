import { GlobalConfig } from "payload/types";
import { revalidate } from "../utilities/revalidate";

const CompanyInfo: GlobalConfig = {
  slug: "company-info",
  label: {
    en: "Company Information",
    ru: "Информация о компании",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: "Settings",
      ru: "Настройки",
    },
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
      name: "name",
      type: "text",
      label: {
        en: "Company Name",
        ru: "Название компании",
      },
    },
    {
      name: "email",
      type: "text",
      label: {
        en: "Email",
        ru: "Email",
      },
    },
    {
      name: "phone",
      type: "text",
      label: {
        en: "Phone",
        ru: "Телефон",
      },
    },
    {
      name: "whatsapp",
      type: "text",
      label: {
        en: "Whatsapp Link",
        ru: "Ссылка на Whatsapp",
      },
    },
    {
      name: "address",
      type: "text",
      label: {
        en: "Address",
        ru: "Адрес",
      },
    },
    {
      name: "yandexMapLink",
      type: "text",
      label: {
        en: "Yandex Maps Link",
        ru: "Ссылка на Яндекс Карты",
      },
    },
    {
      name: "policy",
      type: "richText",
    },
  ],
};

export default CompanyInfo;
