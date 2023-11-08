"use client";

import { BannerProps } from "@/payload-types";
import { Box, Container, Stack, Title, rem } from "@mantine/core";
import React from "react";
import classes from "./Banner.module.css";
import { CallToAction } from "@/_components/CallToAction";
// import SVGGradient from "../../../../public/yellow-gradient.svg";
// import { BlurBG } from "@/_components/BlurBG";

export const Banner: React.FC<BannerProps> = ({
  title,
  color,
  callToAction,
}) => {
  return (
    <Box
      component="section"
      className={classes.root}
      pos="relative"
      data-mantine-color-scheme={
        {
          brandPrimary: "light",
          dark: "dark",
        }[color] || undefined
      }
    >
      <Box
        className={`${
          { brandPrimary: classes.bgBrandPrimary, dark: classes.bgDark }[
            color
          ] || undefined
        }`}
        py={rem(42)}
        pos="relative"
      >
        <Container>
          <Stack justify="center" align="center" my=" xl" gap="xl">
            <Title order={2} fw={600} ta="center" maw={800}>
              {title || <em>Отсутствует заголовок</em>}
            </Title>
            <CallToAction {...(callToAction as any)} />
          </Stack>
        </Container>
      </Box>
      {/* <BlurBG color={color} /> */}
    </Box>
  );
};
