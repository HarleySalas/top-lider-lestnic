import type { SerializedListItemNode, SerializedListNode } from "@lexical/list";
import type {
  SerializedHeadingNode,
  SerializedQuoteNode,
} from "@lexical/rich-text";
import type {
  LinkFields,
  SerializedLinkNode,
} from "@payloadcms/richtext-lexical";
import type {
  SerializedElementNode,
  SerializedLexicalNode,
  SerializedParagraphNode,
  SerializedTextNode,
} from "lexical";

import React, { Fragment } from "react";
import escapeHTML from "escape-html";
import Link from "next/link";

import classes from "./serialize.module.css";

import { IconPoint, IconSquare, IconSquareCheck } from "@tabler/icons-react";

import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_UNDERLINE,
} from "./nodeFormat";
import {
  Anchor,
  Blockquote,
  List,
  Text,
  ThemeIcon,
  Title,
  TitleOrder,
} from "@mantine/core";

interface Props {
  nodes: SerializedLexicalNode[];
}

export const serialize = ({ nodes }: Props): JSX.Element => {
  return (
    <Fragment>
      {nodes?.map((_node, index): JSX.Element | null => {
        if (_node.type === "text") {
          const node = _node as SerializedTextNode;

          let text: any = escapeHTML(node.text);

          if (node.format & IS_BOLD) {
            text = (
              <Text component="strong" key={index} fw={700}>
                {text}
              </Text>
            );
          }

          if (node.format & IS_ITALIC) {
            text = (
              <Text key={index} component="em" fs="italic">
                {text}
              </Text>
            );
          }

          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <Text key={index} component="span" td="line-through">
                {text}
              </Text>
            );
          }

          if (node.format & IS_UNDERLINE) {
            text = (
              <Text component="span" key={index} td="underline">
                {text}
              </Text>
            );
          }

          if (node.format & IS_CODE) {
            text = <code key={index}>{text}</code>;
          }

          return text;
        }

        if (_node == null) {
          return null;
        }

        // NOTE: Hacky fix for
        // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
        // which does not return checked: false (only true - i.e. there is no prop for false)
        const serializedChildrenFn = (
          node: SerializedElementNode
        ): JSX.Element | null => {
          if (node.children == null) {
            return null;
          } else {
            if (
              node?.type === "list" &&
              (node as SerializedListNode)?.listType === "check"
            ) {
              for (const item of node.children) {
                if ("checked" in item) {
                  if (!item?.checked) {
                    item.checked = false;
                  }
                }
              }
              return serialize({ nodes: node.children });
            } else {
              return serialize({ nodes: node.children });
            }
          }
        };

        const serializedChildren =
          "children" in _node
            ? serializedChildrenFn(_node as SerializedElementNode)
            : "";

        switch (_node.type) {
          case "linebreak": {
            return <br key={index} />;
          }
          case "paragraph": {
            const node = _node as SerializedParagraphNode;
            return (
              <Text
                key={index}
                ta={node?.format as any}
                ml={
                  (node?.format === "right" || node?.format === "center") &&
                  "auto"
                }
                mr={
                  (node?.format === "left" || node?.format === "center") &&
                  "auto"
                }
                style={{ marginBlockStart: "1rem", marginBlockEnd: "1rem" }}
              >
                {serializedChildren}
              </Text>
            );
          }
          case "heading": {
            const node = _node as SerializedHeadingNode;

            type Heading = Extract<
              keyof JSX.IntrinsicElements,
              "h1" | "h2" | "h3" | "h4" | "h5"
            >;

            const headingLevel = parseInt(node?.tag.replace(/\D/g, ""), 10);

            let titleOrder: TitleOrder;

            if (headingLevel >= 1 && headingLevel <= 6) {
              titleOrder = headingLevel as TitleOrder;
            } else {
              titleOrder = 1;
            }

            return (
              <Title
                order={titleOrder}
                key={index}
                ta={node?.format as any}
                ml={
                  (node?.format === "right" || node?.format === "center") &&
                  "auto"
                }
                mr={
                  (node?.format === "left" || node?.format === "center") &&
                  "auto"
                }
                style={{ marginBlockEnd: "2rem", marginBlockStart: "2rem" }}
              >
                {serializedChildren}
              </Title>
            );
          }
          case "list": {
            const node = _node as SerializedListNode;

            return (
              <List
                key={index}
                type={node?.tag === "ol" ? "ordered" : "unordered"}
                spacing={node?.listType === "check" ? 4 : "xs"}
                withPadding
                icon={
                  node?.tag !== "ol" && node?.listType !== "check" ? (
                    <ThemeIcon radius="xl" size={26} variant="transparent">
                      <IconPoint stroke={2} />
                    </ThemeIcon>
                  ) : node?.listType === "check" ? (
                    <ThemeIcon radius="xl" variant="transparent" size={26}>
                      <IconSquare size={26} />
                    </ThemeIcon>
                  ) : undefined
                }
                styles={
                  node?.tag !== "ol"
                    ? {
                        itemWrapper: {
                          alignItems: "flex-start",
                        },
                        itemLabel: {
                          paddingTop: "0.04rem",
                        },
                      }
                    : undefined
                }
                classNames={
                  node?.tag === "ol" && node?.listType !== "check"
                    ? {
                        root: classes.olRoot,
                        item: classes.olItem,
                      }
                    : undefined
                }
              >
                {serializedChildren}
              </List>
            );
          }
          case "listitem": {
            const node = _node as SerializedListItemNode;

            if (node?.checked != null) {
              return (
                <List.Item
                  key={index}
                  aria-checked={node.checked ? "true" : "false"}
                  role="checkbox"
                  tabIndex={-1}
                  value={node?.value}
                  icon={
                    node.checked ? (
                      <ThemeIcon radius="xl" variant="transparent" size={26}>
                        <IconSquareCheck size={26} />
                      </ThemeIcon>
                    ) : undefined
                  }
                >
                  {serializedChildren}
                </List.Item>
              );
            } else {
              return (
                <List.Item key={index} value={node?.value}>
                  {serializedChildren}
                </List.Item>
              );
            }
          }
          case "quote": {
            const node = _node as SerializedQuoteNode;

            return <Blockquote key={index}>{serializedChildren}</Blockquote>;
          }
          case "link":
          case "autolink": {
            const node = _node as SerializedLinkNode;
            const fields: any = node.fields;

            return (
              <Anchor
                key={index}
                component={Link}
                c="blue"
                href={escapeHTML(
                  fields?.linkType === "custom"
                    ? fields?.url
                    : fields?.doc?.value?.pathname
                )}
                {...(fields?.newTab
                  ? {
                      rel: "noopener noreferrer",
                      target: "_blank",
                    }
                  : {})}
              >
                {serializedChildren}
              </Anchor>
            );
          }

          default:
            return null;
        }
      })}
    </Fragment>
  );
};

// import React, { Fragment } from "react";
// import escapeHTML from "escape-html";
// // @ts-ignore
// import Link from "next-intl/navigation";
// import { Text } from "slate";
// import { Anchor } from "@mantine/core";

// // eslint-disable-next-line no-use-before-define
// type Children = Leaf[];

// type Leaf = {
//   type: string;
//   value?: {
//     url: string;
//     alt: string;
//   };
//   children?: Children;
//   url?: string;
//   [key: string]: unknown;
// };

// const serialize = (children?: Children): React.ReactNode[] =>
//   children?.map((node, i) => {
//     if (Text.isText(node)) {
//       let text = (
//         <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
//       );

//       if (node.bold) {
//         text = <strong key={i}>{text}</strong>;
//       }

//       if (node.code) {
//         text = <code key={i}>{text}</code>;
//       }

//       if (node.italic) {
//         text = <em key={i}>{text}</em>;
//       }

//       if (node.underline) {
//         text = (
//           <span style={{ textDecoration: "underline" }} key={i}>
//             {text}
//           </span>
//         );
//       }

//       if (node.strikethrough) {
//         text = (
//           <span style={{ textDecoration: "line-through" }} key={i}>
//             {text}
//           </span>
//         );
//       }

//       return <Fragment key={i}>{text}</Fragment>;
//     }

//     if (!node) {
//       return null;
//     }

//     switch (node.type) {
//       case "h1":
//         return <h1 key={i}>{serialize(node?.children)}</h1>;
//       case "h2":
//         return <h2 key={i}>{serialize(node?.children)}</h2>;
//       case "h3":
//         return <h3 key={i}>{serialize(node?.children)}</h3>;
//       case "h4":
//         return <h4 key={i}>{serialize(node?.children)}</h4>;
//       case "h5":
//         return <h5 key={i}>{serialize(node?.children)}</h5>;
//       case "h6":
//         return <h6 key={i}>{serialize(node?.children)}</h6>;
//       case "quote":
//         return <blockquote key={i}>{serialize(node?.children)}</blockquote>;
//       case "ul":
//         return <ul key={i}>{serialize(node?.children)}</ul>;
//       case "ol":
//         return <ol key={i}>{serialize(node.children)}</ol>;
//       case "li":
//         return <li key={i}>{serialize(node.children)}</li>;
//       case "link":
//         return (
//           <Anchor
//             component={Link as any}
//             href={escapeHTML(node.url)}
//             key={i}
//             {...(node?.newTab
//               ? {
//                   target: "_blank",
//                   rel: "noopener noreferrer",
//                 }
//               : {})}
//           >
//             {serialize(node?.children)}
//           </Anchor>
//         );

//       // case 'label':
//       //   return <Label key={i}>{serialize(node?.children)}</Label>

//       // case 'large-body': {
//       //   return <LargeBody key={i}>{serialize(node?.children)}</LargeBody>
//       // }

//       default:
//         return <p key={i}>{serialize(node?.children)}</p>;
//     }
//   }) || [];

// export default serialize;
