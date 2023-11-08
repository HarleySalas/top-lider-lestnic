"use client";

import { Config } from "@/payload-types";
import { useLivePreview } from "@payloadcms/live-preview-react";
import React, { ReactNode, createContext, useContext, useMemo } from "react";

export type Globals = {
  companyInfo: Config["globals"]["company-info"];
  header: Config["globals"]["header"];
  footer: Config["globals"]["footer"];
};

const GlobalsContext = createContext<Globals>(null);

export const useGlobalsContext = () => {
  return useContext(GlobalsContext);
};

export const GlobalsProvider = ({
  children,
  globals,
}: {
  children: ReactNode;
  globals: Globals;
}) => {
  // const { data: companyInfo } = useLivePreview({
  //   serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  //   depth: 2,
  //   initialData: globals.companyInfo,
  // });

  // const { data: header } = useLivePreview({
  //   serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  //   depth: 2,
  //   initialData: globals.header,
  // });

  // const { data: footer } = useLivePreview({
  //   serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  //   depth: 2,
  //   initialData: globals.footer,
  // });

  // const data = useMemo(() => {
  //   return {
  //     companyInfo,
  //     header,
  //     footer,
  //   }
  // }, [companyInfo, header, footer])

  const data = globals;

  return (
    <GlobalsContext.Provider value={{ ...data }}>
      {children}
    </GlobalsContext.Provider>
  );
};
