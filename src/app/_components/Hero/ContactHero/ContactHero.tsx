import React from "react";
import { HeroProps } from "../";
import classes from "./ContactHero.module.css";
import {
  Anchor,
  Box,
  Container,
  Group,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { Form } from "@/_components/Form";
import { Form as FormType } from "@/payload-types";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import { useGlobalsContext } from "@/_components/ClientProvider/GlobalsProvider";

export const ContactHero: React.FC<HeroProps> = ({ hero }) => {
  const { companyInfo } = useGlobalsContext();
  return (
    <Box className={classes.root} py="xl">
      <Container size={hero?.containerSize} my="xl">
        <Title ta="center">{hero?.title}</Title>
        <Text ta="center" my="xl">
          {hero?.subtitle}
        </Text>
        <Container>
          <SimpleGrid cols={{ base: 1, md: 3 }} my="xl">
            <Group gap="xs">
              <ThemeIcon variant="light" radius="xl">
                <IconMail strokeWidth={1.5} />
              </ThemeIcon>
              <Anchor
                c="dark"
                href={`mailto:${companyInfo?.email}`}
                size="xs"
                fw={500}
              >
                {companyInfo.email}
              </Anchor>
            </Group>
            <Group gap="xs">
              <ThemeIcon variant="light" radius="xl">
                <IconPhone strokeWidth={1.5} />
              </ThemeIcon>
              <Anchor
                c="dark"
                href={`tel:${companyInfo?.phone}`}
                size="xs"
                fw={500}
              >
                {companyInfo?.phone}
              </Anchor>
            </Group>
            <Group gap="xs" wrap="nowrap">
              <ThemeIcon variant="light" radius="xl">
                <IconMapPin strokeWidth={1.5} />
              </ThemeIcon>
              <Anchor
                c="dark"
                href={companyInfo?.yandexMapLink}
                target="_blank"
                size="xs"
                fw={500}
              >
                {companyInfo?.address}
              </Anchor>
            </Group>
          </SimpleGrid>
          <Form data={hero?.form as FormType} contact />
        </Container>
      </Container>
    </Box>
  );
};
