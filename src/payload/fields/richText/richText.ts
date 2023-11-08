import {
  lexicalEditor,
  HeadingFeature,
  LinkFeature,
  FeatureProvider,
} from "@payloadcms/richtext-lexical";
import { Field, RichTextField } from "payload/types";
import { collections } from "../../payload.config";

type LexicalFeatures =
  | "orderedList"
  | "unorderedList"
  | "checkList"
  | "heading"
  | "blockquote"
  | "align"
  | "indent";

type RichText = (
  overrides?: Partial<RichTextField>,
  additions?: {
    features?: FeatureProvider[];
    lexical?: any;
    excludedFeatures?: LexicalFeatures[];
  }
) => RichTextField;

export const richText: RichText = (overrides, additions = {}) => {
  const defaultFeatures = [
    HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4", "h5", "h6"] }),
    LinkFeature({
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ("name" in field && field.name === "fields" && "fields" in field) {
            const docField = field.fields.find(
              (subField) =>
                subField && "name" in subField && subField.name === "doc"
            ) as Field;

            if (docField && "relationTo" in docField) {
              docField.relationTo = collections
                .filter(
                  (collection) =>
                    collection &&
                    collection.admin &&
                    collection.admin.enableRichTextLink
                )
                .map(({ slug }) => slug);
            }
          }
          return field;
        });
      },
    }),
  ];

  const lexicalOptions = lexicalEditor({
    lexical: additions.lexical,
    features: ({ defaultFeatures: providedDefaultFeatures }) => [
      ...providedDefaultFeatures.filter(
        (feature) =>
          ![
            "upload",
            "relationship",
            ...(additions?.excludedFeatures || []),
          ].includes(feature.key)
      ),
      ...defaultFeatures.filter(
        (feature) =>
          !(additions?.excludedFeatures || []).includes(feature.key as any)
      ),
      ...(additions.features || []),
    ],
  });

  const fieldOverrides = {
    ...(overrides || {}),
  };

  return {
    name: "richText",
    type: "richText",
    editor: lexicalOptions,
    ...fieldOverrides,
  };
};
