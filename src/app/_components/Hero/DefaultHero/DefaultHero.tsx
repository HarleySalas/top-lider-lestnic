import { RichTextLexical } from "@/_components/RichTextLexical";
import { Page } from "@/payload-types";
import { Container, Title } from "@mantine/core";
import React from "react";
import { HeroProps } from "../";

export const DefaultHero: React.FC<HeroProps> = ({ hero }) => {
  const { richText } = hero;
  return (
    <>
      <Container>
        {/* <RichTextLexical content={richText} /> */}
        <Title>{hero?.title}</Title>
      </Container>
    </>
  );
};
