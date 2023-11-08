import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import type { GenerateTitle } from "@payloadcms/plugin-seo/types";
import dotenv from "dotenv";
import path from "path";
import { buildConfig } from "payload/config";
import BeforeDashboard from "./components/BeforeDashboard";
import BeforeLogin from "./components/BeforeLogin";

import {
  Pages,
  Media,
  Gallery,
  Forms,
  FormSubmissions,
  Users,
} from "./collections";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { richText } from "./fields/richText";
import { PayloadPluginNestedDocs, PayloadPluginSeo } from "./plugins";
import { LexicalEditor } from "lexical";
import { Header } from "./globals/Header";
import { Footer } from "./globals/Footer";
import CompanyInfo from "./globals/CompanyInfo";

export const collections = [
  Pages,
  Media,
  Gallery,
  Forms,
  FormSubmissions,
  Users,
];

const mockModulePath = path.resolve(__dirname, "./emptyModuleMock.js");

const generateTitle: GenerateTitle = () => {
  return "My Website";
};

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

export default buildConfig({
  collections,
  globals: [CompanyInfo, Header, Footer],
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      // beforeLogin: [BeforeLogin],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      // beforeDashboard: [BeforeDashboard],
    },
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          dotenv: path.resolve(__dirname, "./dotenv.js"),
          [path.resolve(__dirname, "./hooks/generateBlurDataURL")]:
            mockModulePath,
        },
      },
    }),
  },
  // editor: richText().editor,
  editor: lexicalEditor({}),

  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,

  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
  upload: {
    limits: {
      fileSize: 15000000, // bytes
    },
  },
  endpoints: [],
  plugins: [PayloadPluginSeo(), PayloadPluginNestedDocs()],
});
