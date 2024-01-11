import { Container, Title } from "@mantine/core";
import React from "react";
import { HeroProps } from "../";

export const DefaultHero: React.FC<HeroProps> = ({ hero }) => {
  return (
    <>
      <Container my="xl">
        {/* <RichTextLexical content={richText} /> */}
        <Title>{hero?.title}</Title>
      </Container>
    </>
  );
};
