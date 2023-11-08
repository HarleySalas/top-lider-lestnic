"use client";

import React from "react";
import { Title, Text, Anchor, Container } from "@mantine/core";
import Link from "next/link";

const NotFound = () => {
  return (
    <Container size="lg" my={142}>
      <Title>404: Page Not Found</Title>
      <Text>
        Return to the{" "}
        <Anchor component={Link} href="/" c="blue">
          Homepage
        </Anchor>
      </Text>
    </Container>
  );
};

export default NotFound;
