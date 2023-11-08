import { StepsProps } from "@/payload-types";
import { SimpleGrid, Stack, Text, ThemeIcon } from "@mantine/core";
import React, { Fragment } from "react";

export const Steps: React.FC<StepsProps> = ({ items }) => {
  return (
    <SimpleGrid cols={{ base: 2, md: 3, xl: 6 }} spacing="xl" mt={42}>
      {items?.map((item, index) => (
        <Fragment key={`step-${item?.id}-${index}`}>
          <Stack gap="xs">
            <ThemeIcon variant="outline" radius="xl" mx="auto">
              <Text fw={400} lh={1}>
                {index + 1}
              </Text>
            </ThemeIcon>
            <Text fw={500} ta="center">
              {item?.title || "Отсутствует заголовок"}
            </Text>
            <Text ta="center" c="dimmed">
              {item?.description || "Отсутствует описание"}
            </Text>
          </Stack>
        </Fragment>
      ))}
    </SimpleGrid>
  );
};
