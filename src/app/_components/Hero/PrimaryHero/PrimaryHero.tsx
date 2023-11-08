import { RichTextLexical } from "@/_components/RichTextLexical";
import { HeroField, Media } from "@/payload-types";
import {
  AspectRatio,
  Box,
  Container,
  Flex,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  rem,
} from "@mantine/core";
import { Image } from "@/_components/Image";
import React from "react";
import SVG from "../../../../../public/yellow-gradient.svg";
import classes from "./PrimaryHero.module.css";
import { HeroProps } from "..";
import { IconMapPin, IconMapPin2 } from "@tabler/icons-react";
import { CallToAction } from "@/_components/CallToAction";
import { ContainedAspectRatio } from "@/_components/ContainedAspectRatio";

export const PrimaryHero: React.FC<HeroProps> = ({ hero }) => {
  const { media } = hero as { media: Media };
  return (
    <Box className={classes.root}>
      <Container py={rem(42)}>
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack
              align="flex-start"
              justify="center"
              h={{ base: "auto", sm: "52vh", lg: "60vh" }}
              mih={{ base: "initial", sm: rem(500), lg: rem(630) }}
            >
              <Group align="center" gap={rem(4)} mb={{ lg: "sm" }}>
                <ThemeIcon variant="transparent">
                  <IconMapPin2 style={{ display: "block" }} strokeWidth={2} />
                </ThemeIcon>
                <Text tt="uppercase" fw={600} size="lg">
                  Москва и МО
                </Text>
              </Group>
              <Title mb={{ base: "xl", lg: rem(72) }} className={classes.title}>
                {hero?.title}
              </Title>
              <Stack gap={rem(4)} mb={{ base: "md", lg: rem(42) }}>
                {hero.items.map((item) => (
                  <Text
                    key={item?.id}
                    fw={400}
                    fz="sm"
                    tt="uppercase"
                    c="dimmed"
                  >
                    {item?.text}
                  </Text>
                ))}
              </Stack>

              <CallToAction {...hero.callToAction} />
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Box pos="relative" h={{ base: "100vw", sm: "100%" }} w="100%">
              <ContainedAspectRatio ratio={1} center={true}>
                <Image
                  src={media?.sizes?.square?.url}
                  fill={true}
                  radius="xl"
                  sizes={`100vw, (min-width: 48em) 50vw, (min-width: 62em) 42rem`}
                  style={{ objectFit: "cover" }}
                  priority={true}
                />
              </ContainedAspectRatio>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
      <Box className={classes.background} />
    </Box>
  );
};
