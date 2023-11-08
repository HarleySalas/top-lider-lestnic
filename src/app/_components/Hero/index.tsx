"use client";

import { DefaultHero } from "./DefaultHero";
import { MinimalHero } from "./MinimalHero";
import { PrimaryHero } from "./PrimaryHero";
import { HeroField, Page } from "@/payload/payload-types";
import { Breadcrumb } from "@payloadcms/plugin-nested-docs/dist/types";

export type HeroProps = {
  hero: HeroField;
  breadcrumbs: Page["breadcrumbs"];
};

const heroes = {
  default: DefaultHero,
  primary: PrimaryHero,
  minimal: MinimalHero,
};

export const Hero: React.FC<HeroProps> = ({ hero, breadcrumbs }) => {
  const HeroToRender = heroes[hero?.type] as any;

  if (HeroToRender) {
    return <HeroToRender hero={hero} breadcrumbs={breadcrumbs} />;
  }
  return null;
};
