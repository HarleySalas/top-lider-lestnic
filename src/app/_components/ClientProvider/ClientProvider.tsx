"use client";

import React, { ReactNode } from "react";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@/global.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/_styles/theme";
import { Notifications } from "@mantine/notifications";
import { AppLayout } from "../AppLayout";
import { Globals, GlobalsProvider } from "./GlobalsProvider";
import { cssVariablesResolver } from "@/_styles/cssVariablesResolver";

const ClientProvider = ({
  children,
  globals,
}: {
  children: ReactNode;
  globals: Globals;
}) => {
  return (
    <GlobalsProvider globals={globals}>
      <MantineProvider
        defaultColorScheme="light"
        theme={theme}
        cssVariablesResolver={cssVariablesResolver}
      >
        <Notifications />
        <AppLayout>{children}</AppLayout>
      </MantineProvider>
    </GlobalsProvider>
  );
};

export default ClientProvider;
