import { Block } from "payload/types";
import { sectionTitle } from "../fields/sectionTitle";
import { FormCard } from "./FormCard";
import { TypeTabs } from "./TypeTabs";
import { ContentWithImages } from "./ContentWithImages";
import { Steps } from "./Steps";
import { Accordion } from "./Accordion";
import { GalleryPreview } from "./GalleryPreview";

export const Section: Block = {
  slug: "section",
  interfaceName: "Section",
  labels: {
    singular: {
      en: "Section",
      ru: "Раздел",
    },
    plural: {
      en: "Sections",
      ru: "Разделы",
    },
  },
  fields: [
    sectionTitle,
    {
      name: "background",
      type: "select",
      label: {
        en: "Background",
        ru: "Фон",
      },
      options: [
        {
          label: {
            en: "White",
            ru: "Белый",
          },
          value: "white",
        },
        {
          label: {
            en: "Gray",
            ru: "Серый",
          },
          value: "gray",
        },
        {
          label: {
            en: "Black",
            ru: "Черный",
          },
          value: "black",
        },
      ],
    },
    {
      name: "blocks",
      type: "blocks",
      label: {
        en: "Blocks",
        ru: "Блоки",
      },
      labels: {
        singular: {
          en: "Block",
          ru: "Блок",
        },
        plural: {
          en: "Blocks",
          ru: "Блоки",
        },
      },
      blocks: [
        FormCard,
        TypeTabs,
        ContentWithImages,
        Steps,
        Accordion,
        GalleryPreview,
      ],
    },
  ],
};
