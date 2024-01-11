"use client";

import React from "react";
import {
  Anchor,
  Box,
  Container,
  Flex,
  Grid,
  Text,
  UnstyledButton,
} from "@mantine/core";
import classes from "./Footer.module.css";
import Logo from "../../../../../public/logo.svg";
import Link from "next/link";
import { useGlobalsContext } from "@/_components/ClientProvider/GlobalsProvider";
import { getLinkUrl } from "@/_utilities/getLinkUrl";
import { getLinkLabel } from "@/_utilities/getLinkLabel";

const Footer = () => {
  const { companyInfo, footer } = useGlobalsContext();

  return (
    <Box className={classes.footer} py="4rem" data-mantine-color-scheme="dark">
      <Container>
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, xs: 4, md: 3 }}>
            <Flex
              justify={{ base: "center", xs: "flex-start" }}
              mb={{ base: "md", xs: 0 }}
            >
              <Link href="/" className={classes.logoLink}>
                <Logo className={classes.logo} />
              </Link>
            </Flex>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 8, md: 6 }}>
            <Flex
              direction={{ base: "column", xs: "row" }}
              justify={{ base: "center", xs: "flex-end", md: "center" }}
              align={{ base: "center", xs: "flex-start" }}
              gap={{ base: "xs", xs: "xl" }}
            >
              {footer?.links.map(({ id, link }) => (
                <UnstyledButton
                  key={id}
                  component={Link}
                  href={getLinkUrl(link)}
                  className={classes.control}
                >
                  {getLinkLabel(link)}
                </UnstyledButton>
              ))}
            </Flex>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
            <Flex
              justify={{
                base: "center",
                xs: "flex-start",
                md: "flex-end",
              }}
              align="flex-start"
            >
              <UnstyledButton
                component={Link}
                href={getLinkUrl(footer?.legal)}
                className={classes.control}
              >
                {footer.legal?.label || "Отсутствует метка ссылки"}
              </UnstyledButton>
            </Flex>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6 }}>
            <Flex
              direction={{ base: "column" }}
              align={{
                base: "center",
                xs: "flex-end",
                md: "flex-start",
              }}
              justify={{ xs: "flex-start" }}
            >
              <Text c="dimmed">
                Разработка сайта{" "}
                <Anchor
                  component={Link}
                  href="http://boldmedia.ru/"
                  target={"_blank"}
                  rel="noopener"
                  c="dimmed"
                >
                  Boldmedia
                </Anchor>
              </Text>
              <Text c="dimmed">© {companyInfo?.name} 2023</Text>
            </Flex>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text c="dimmed" ta={{ base: "center", md: "right" }}>
              {footer?.legalWarning || ""}
            </Text>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
