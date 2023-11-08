import type { Media, TypeTabsProps } from "@/payload-types";

import classes from "./TypeTabs.module.css";
import {
  AspectRatio,
  Box,
  Flex,
  Grid,
  List,
  Tabs,
  ThemeIcon,
  Title,
  em,
  rem,
} from "@mantine/core";
// import Image from 'next/image'
import { RichTextLexical } from "@/_components/RichTextLexical";
import { IconCircleCheck } from "@tabler/icons-react";
import { CallToAction } from "@/_components/CallToAction";
import { Image } from "@/_components/Image";

export const TypeTabs: React.FC<TypeTabsProps> = (props) => {
  const { tabs, callToAction } = props;

  return (
    <Tabs
      variant="pills"
      radius="xl"
      // styles={{ tabLabel: { color: `var(--mantine-color-dark-7)` } }}
      defaultValue={tabs[0]?.title}
      // style={{ overflowX: "hidden", overflowY: "hidden" }}
    >
      <Tabs.List mb="xl">
        {tabs?.map((tab, index) => (
          <Tabs.Tab
            value={tab?.title || "none"}
            key={`tab-${tab?.title || "missing"}-${index}`}
            tt="uppercase"
            fw={500}
            fz="sm"
          >
            {tab?.title || "Отсутствует заголовок"}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {tabs?.map((tab, index) => (
        <Tabs.Panel
          value={tab?.title || "none"}
          key={`panel-${tab?.title || "missing"}-${index}`}
        >
          <Grid gutter="xl" style={{ overflow: "visible" }}>
            <Grid.Col
              span={{ base: 12, md: 6 }}
              mih={{ base: 0, md: 550 }}
              pb={{ base: "xl", md: 0 }}
            >
              <Flex
                w="100%"
                h="100%"
                justify={{ base: "center", md: "flex-start" }}
                align="flex-start"
              >
                <Box className={classes.imageWrapper}>
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      image={tab?.image as Media}
                      className={classes.image}
                      fill={true}
                      sizes={`(min-width: ${em(993)}) 32vw`}
                    />
                  </AspectRatio>
                  <Box className={classes.patternWrapper}>
                    <AspectRatio ratio={1 / 1} w="100%">
                      <Image
                        image={tab?.texture as Media}
                        fill={true}
                        sizes="(min-width: 1em) 160px"
                      />
                    </AspectRatio>
                  </Box>
                </Box>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }} pt="42">
              <Title order={3} mb="md">
                {tab?.title}
              </Title>
              <RichTextLexical content={tab?.description} mb="xl" />
              {tab?.list ? (
                <List
                  icon={
                    <ThemeIcon radius="xl" variant="filled" size={24}>
                      <IconCircleCheck stroke={1.7} size={20} />
                    </ThemeIcon>
                  }
                  spacing="md"
                  mb="lg"
                  center={false}
                  styles={{
                    itemWrapper: { alignItems: "flex-start" },
                  }}
                >
                  {tab?.list?.map((listItem, index) => (
                    <List.Item key={`${listItem?.id}-${index}`}>
                      <Title order={3} fz="md">
                        {listItem?.title}
                      </Title>
                      <RichTextLexical
                        content={listItem?.description}
                        mt={rem(-14)}
                      />
                    </List.Item>
                  ))}
                </List>
              ) : null}
              <CallToAction {...(callToAction as any)} mt="xl" />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
