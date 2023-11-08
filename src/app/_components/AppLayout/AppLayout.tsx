"use client";

import React, { useEffect } from "react";
import {
  AppShell,
  Group,
  Text,
  Burger,
  UnstyledButton,
  RemoveScroll,
  ThemeIcon,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./AppLayout.module.css";
import Link from "next/link";
import { Footer } from "./Footer";
// import Logo from "../../../../public/logo.svg";
import Logo from "../../../../public/logo.svg";
import { IconBrandWhatsapp, IconPhone } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useGlobalsContext } from "../ClientProvider/GlobalsProvider";
import { getLinkUrl } from "@/_utilities/getLinkUrl";
import { getLinkLabel } from "@/_utilities/getLinkLabel";

const AppLayout = ({ children }) => {
  const { companyInfo, header } = useGlobalsContext();
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

  useEffect(() => {
    if (opened) {
      close();
    }
  }, [pathname]);

  return (
    <>
      <AppShell
        header={{ height: 72 }}
        navbar={{
          width: 300,
          breakpoint: "md",
          collapsed: { desktop: true, mobile: !opened },
        }}
        padding={0}
        withBorder={false}
        // style={{ paddingRight: RemoveScroll.classNames.fullWidth }}
      >
        <AppShell.Header
          className={`${classes.header}`}
          style={{ transition: "none" }}
        >
          <Group h="100%" px="md" wrap="nowrap" justify="space-between">
            <Group w={{ base: "auto", md: "18rem" }}>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="md"
                size="md"
                color="white"
              />
              <Link href="/" className={classes.logoLink}>
                <Logo className={classes.logo} />
              </Link>
            </Group>
            <Group
              w={{ base: 0, md: "100%" }}
              h="100%"
              gap={0}
              justify="center"
              visibleFrom="md"
            >
              {header?.links
                ? header?.links?.map(({ id, link }) => (
                    <UnstyledButton
                      key={id}
                      component={Link}
                      href={`${getLinkUrl(link)}`}
                      className={classes.control}
                      scroll={true}
                    >
                      {getLinkLabel(link)}
                    </UnstyledButton>
                  ))
                : null}
            </Group>
            <Group
              w={{ base: "auto", md: "18rem" }}
              align="center"
              justify="flex-end"
            >
              <UnstyledButton
                component="a"
                href={companyInfo?.phone ? `tel:${companyInfo?.phone}` : "/"}
                className={classes.control}
                visibleFrom="xs"
              >
                <Group align="center" wrap="nowrap" gap="xs">
                  <ThemeIcon variant="transparent" size="md">
                    <IconPhone size="1.5rem" strokeWidth={1.5} />
                  </ThemeIcon>
                  <Text
                    component="div"
                    fw={500}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {companyInfo?.phone || "Телефон отсутствует"}
                  </Text>
                </Group>
              </UnstyledButton>
              <ActionIcon
                component="a"
                href={companyInfo?.whatsapp ? `${companyInfo?.whatsapp}` : "/"}
                hiddenFrom="xs"
                variant="light"
                size="lg"
              >
                <IconBrandWhatsapp size="1.4rem" strokeWidth={1.5} />
              </ActionIcon>
              <ActionIcon
                component="a"
                href={companyInfo?.phone ? `tel:${companyInfo?.phone}` : "/"}
                hiddenFrom="xs"
                variant="light"
                size="lg"
              >
                <IconPhone size="1.4rem" strokeWidth={1.5} />
              </ActionIcon>
            </Group>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar py="md" px={4} className={classes.navbar}>
          <RemoveScroll enabled={opened}>
            {header?.links
              ? header?.links?.map(({ id, link }) => (
                  <UnstyledButton
                    key={id}
                    component={Link}
                    href={getLinkUrl(link)}
                    className={classes.control}
                  >
                    {getLinkLabel(link)}
                  </UnstyledButton>
                ))
              : null}
          </RemoveScroll>
        </AppShell.Navbar>

        {children}

        <Footer />
      </AppShell>
    </>
  );
};

export default AppLayout;
