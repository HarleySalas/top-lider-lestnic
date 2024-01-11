"use client";

import { Section as SectionProps } from "@/payload-types";
import { Box, Container, Grid, Text, Title, rem } from "@mantine/core";
import React from "react";
import classes from "./Section.module.css";
import { RenderBlocks } from "@/_components/RenderBlocks";
import { blockComponents } from "..";

export const Section: React.FC<SectionProps> = ({
  sectionTitle,
  background,
  blocks,
}) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  return (
    <Box
      component="section"
      data-mantine-color-scheme={background === "black" ? "dark" : "light"}
      className={classes.root}
    >
      <Box
        className={`${classes.background} ${
          background === "gray" && classes.graySection
        }`}
        py={!sectionTitle.disabled && "5rem"}
        // pb={sectionTitle.disabled && "5rem"}
      >
        <Container>
          {!sectionTitle?.disabled ? (
            <Grid gutter={7} mb={{ base: rem(32), sm: rem(24) }}>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Title order={2}>{sectionTitle?.title}</Title>
                {sectionTitle?.subtitle ? (
                  <Text>{sectionTitle?.subtitle}</Text>
                ) : null}
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Text
                  variant="display"
                  c="dimmed"
                  ta={{ base: "left", md: "right" }}
                  maw={{ base: "24rem", md: "initial" }}
                  lh={1.2}
                  tt="uppercase"
                >
                  {sectionTitle?.description}
                </Text>
              </Grid.Col>
            </Grid>
          ) : null}
          {hasBlocks
            ? blocks.map((block, index) => {
                const { id, blockType } = block;

                const Block =
                  blockType && blockType in blockComponents
                    ? (blockComponents[blockType] as React.ComponentType)
                    : null;

                return Block ? (
                  <Block
                    key={`${blockType}-${id}-${index}-nested`}
                    {...block}
                  />
                ) : null;
              })
            : null}
        </Container>
      </Box>
    </Box>
  );
};
