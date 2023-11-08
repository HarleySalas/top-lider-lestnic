"use client";

import { RichTextLexical } from "@/_components/RichTextLexical";
import { ContentBlock } from "@/payload-types";
import { Box, Container } from "@mantine/core";
import React from "react";
import classes from "./Content.module.css";

export const Content: React.FC<ContentBlock> = ({
  containerSize,
  theme,
  richText,
}) => {
  return (
    <Box data-mantine-color-scheme={theme} py="xl">
      <Box component="section" className={classes.background}>
        <Container size={containerSize}>
          <RichTextLexical content={richText} />
        </Container>
      </Box>
    </Box>
  );
};
