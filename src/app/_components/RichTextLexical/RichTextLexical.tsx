"use client";

import React from "react";
import { serialize } from "./serialize";
import { Box, BoxProps } from "@mantine/core";

interface RichTextLexicalProps extends BoxProps {
  content: any;
}

export const RichTextLexical: React.FC<RichTextLexicalProps> = ({
  className,
  content,
  ...rest
}) => {
  if (!content) {
    return null;
  }

  return (
    <Box className={className} {...rest}>
      {content &&
        !Array.isArray(content) &&
        "root" in content &&
        serialize({ nodes: content?.root?.children })}
    </Box>
  );
};
