"use client";

import React from "react";
import type { Page } from "@/payload-types";
import classes from "./FeatureChecklist.module.css";
import {
  Box,
  Container,
  Divider,
  Grid,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { CallToAction } from "@/_components/CallToAction";

export type FeatureChecklistProps = Extract<
  Page["blocks"][0],
  { blockType: "featureChecklist" }
>;

export const FeatureChecklist: React.FC<FeatureChecklistProps> = ({
  theme,
  title,
  description,
  callToAction,
  items,
}) => {
  return (
    <Box
      id="features"
      component="section"
      data-mantine-color-scheme={theme}
      className={classes.root}
      py={{ base: rem(56), sm: rem(72) }}
    >
      <Container>
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Stack style={{ height: "100%" }} justify="space-between">
              <Box>
                <Title order={2} mb="md" className={classes.title}>
                  {title}
                </Title>
                <Text variant="display">{description}</Text>
              </Box>
              <CallToAction {...(callToAction as any)} mr="auto" />
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 9 }}>
            <Grid gutter="lg">
              <Grid.Col>
                <Divider mt={rem(7)} mb={rem(24)} />
              </Grid.Col>
              {items
                ? items?.map((item, index) => (
                    <Grid.Col
                      span={{ base: 12, sm: 6, lg: 4 }}
                      key={`item-${item.id}-${index}`}
                    >
                      <Group wrap="nowrap" align="flex-start">
                        <ThemeIcon variant="light">
                          <IconCheck />
                        </ThemeIcon>
                        <Box>
                          <Title order={3} className={classes.itemTitle}>
                            {item?.title}
                          </Title>
                          <Text lh="xs" c="dimmed">
                            {item?.description}
                          </Text>
                        </Box>
                      </Group>
                    </Grid.Col>
                  ))
                : null}
            </Grid>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};
