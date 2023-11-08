import { ColorSchemeScript } from "@mantine/core";
import { futuraPt } from "@/_styles/fonts";

import { ClientProvider } from "@/_components/ClientProvider";
import { getSeoMetadata } from "@/_utilities/getSeoMetadata";
import { Metadata } from "next";
// import { Globals } from "@/api/fetchGlobals";
import { draftMode } from "next/headers";
import { getPayload } from "@/api/getPayload";
import { Globals } from "./_components/ClientProvider/GlobalsProvider";

// export const generateMetadata = async (): Promise<Metadata> => {
//   return {
//     ...(await getSeoMetadata()),
//     verification: {
//       yandex: 'a4c1c2b5b50b9c54',
//     },
//   }
// }

const getGlobals = async (): Promise<Globals> => {
  const payload = await getPayload();
  const { isEnabled: isDraftMode } = draftMode();
  const getGlobal = async (slug) => {
    const data = await payload.findGlobal({
      slug,
      draft: isDraftMode,
    });
    return data;
  };

  const [companyInfo, header, footer] = await Promise.all([
    getGlobal("company-info"),
    getGlobal("header"),
    getGlobal("footer"),
  ]);

  return {
    companyInfo,
    header,
    footer,
  };
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globals = await getGlobals();

  return (
    <html lang="ru-RU">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body className={futuraPt.className}>
        <ClientProvider globals={globals}>{children}</ClientProvider>
      </body>
    </html>
  );
}
