"use client";

import React from "react";
import {
  Box,
  Accordion as MantineAccordion,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { AccordionProps } from "@/payload-types";
import { RichTextLexical } from "@/_components/RichTextLexical";

const splitArray = (arr) => {
  const middleIndex = Math.ceil(arr.length / 2);
  const firstHalf = arr.slice(0, middleIndex);
  const secondHalf = arr.slice(middleIndex);
  return [firstHalf, secondHalf];
};

export const Accordion: React.FC<AccordionProps> = ({
  rows,
  variant,
  items,
}) => {
  const columns = splitArray(items);

  const AccordionItem = ({ item }) => {
    return (
      <MantineAccordion.Item value={item?.id}>
        <MantineAccordion.Control c="dark.2">
          <Text fw={500}>{item?.title}</Text>
        </MantineAccordion.Control>
        <MantineAccordion.Panel>
          <RichTextLexical content={item?.content} c="dimmed" />
        </MantineAccordion.Panel>
      </MantineAccordion.Item>
    );
  };

  console.log(columns);

  return (
    <MantineAccordion variant={variant}>
      {rows === "1" ? (
        items.map((item) => <AccordionItem key={item?.id} item={item} />)
      ) : rows === "2" ? (
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 0, sm: "md" }}>
          {columns.map((column, index) => (
            <Box key={`column-${index}`}>
              {column.map((item) => {
                return <AccordionItem key={item?.id} item={item} />;
              })}
            </Box>
          ))}
        </SimpleGrid>
      ) : null}
    </MantineAccordion>
  );
};
