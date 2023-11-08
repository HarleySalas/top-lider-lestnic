import React from "react";
import { Anchor, Button, BoxProps } from "@mantine/core";
import { Form, Page } from "@/payload-types";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { FormModal } from "../FormModal";

type PageReference = {
  value: string | Page;
  relationTo: "pages";
};

export type CustomFormReference = {
  value: Form;
  relationTo: "custom-forms";
};

export type Reference = PageReference | CustomFormReference;

interface Props extends BoxProps {
  text?: string;
  actionType?: "link" | "formModal";
  displayType?: "button" | "anchor";
  buttonVariant?:
    | "filled"
    | "light"
    | "outline"
    | "subtle"
    | "transparent"
    | "white";
  buttonColor?: "brandPrimary" | "dark";
  link?: {
    internal?: PageReference;
    external?: string;
    newTab?: boolean;
    type?: "internal" | "external";
  };
  form?: CustomFormReference;
  disabled?: boolean;
}

export const CallToAction: React.FC<Props> = (props) => {
  const {
    text,
    actionType,
    displayType,
    buttonVariant,
    buttonColor,
    link,
    form,
    disabled,
    ...rest
  } = props;

  const Component = displayType === "anchor" ? Anchor : Button;
  const [opened, { open, close }] = useDisclosure(false);

  return disabled ? null : (
    <>
      {text ? (
        <Component
          component={actionType === "link" ? Link : "button"}
          href={
            actionType === "link"
              ? link?.type === "internal"
                ? typeof link?.internal?.value === "string"
                  ? link?.internal?.value || ""
                  : link?.internal?.value?.pathname || ""
                : link?.type === "external"
                ? link?.external || ""
                : ""
              : ""
          }
          variant={displayType === "button" ? buttonVariant : undefined}
          color={displayType === "button" ? buttonColor : undefined}
          target={link?.newTab ? "_blank" : undefined}
          rel={link?.type === "external" ? "noopener noreferrer" : undefined}
          onClick={actionType === "formModal" ? open : undefined}
          underline={displayType === "anchor" ? "always" : undefined}
          {...rest}
        >
          {text}
        </Component>
      ) : null}

      {actionType === "formModal" ? (
        <FormModal data={form?.value} opened={opened} onClose={close} />
      ) : null}
    </>
  );
};
