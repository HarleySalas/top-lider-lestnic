import { RichTextLexical } from "@/_components/RichTextLexical";
import type { HeroProps } from "../index";
import {
  Anchor,
  Breadcrumbs,
  Container,
  Divider,
  Text,
  Title,
  rem,
} from "@mantine/core";
import React from "react";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export const MinimalHero: React.FC<HeroProps> = ({ hero, breadcrumbs }) => {
  const { containerSize, richText } = hero;
  const pathname = usePathname();
  return (
    <Container size={containerSize}>
      <Breadcrumbs
        mt="lg"
        separator={<IconChevronRight size={16} />}
        fz={{ base: "xs", sm: "sm" }}
      >
        {breadcrumbs &&
          breadcrumbs.map((breadcrumb) =>
            pathname === breadcrumb?.url ? (
              <Text
                key={breadcrumb?.id}
                c="dimmed"
                tt="uppercase"
                fw={500}
                fz={{ base: "xs", xs: "sm" }}
                truncate="end"
              >
                {breadcrumb?.label}
              </Text>
            ) : (
              <Anchor
                key={breadcrumb?.id}
                component={Link}
                href={breadcrumb?.url}
                c="dark.2"
                tt="uppercase"
                fw={500}
                fz={{ base: "xs", xs: "sm" }}
              >
                {breadcrumb?.label}
              </Anchor>
            )
          )}
      </Breadcrumbs>
      {/* <RichTextLexical content={richText} style={{ textSizeAdjust: "auto" }} /> */}
      <Title my={rem(36)}>{hero?.title}</Title>
      <Divider />
    </Container>
  );
};
