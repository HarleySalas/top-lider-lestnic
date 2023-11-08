import { Box, BoxProps } from "@mantine/core";
import { mergeRefs, useResizeObserver } from "@mantine/hooks";
import React, { ReactNode, forwardRef } from "react";

interface ContainedAspectRatioProps extends BoxProps {
  ratio: number;
  center: boolean;
  children: ReactNode;
}

export const ContainedAspectRatio = forwardRef<
  HTMLDivElement,
  ContainedAspectRatioProps
>(({ ratio, children, center, ...rest }, ref) => {
  const [resizeRef, rect] = useResizeObserver();

  let boxDimension: any = { width: "100%", height: "100%" };

  if (rect.width / ratio > rect.height) {
    boxDimension.height = "100%";
    boxDimension.width = Math.min(rect.height * ratio, rect.width);
  } else {
    boxDimension.width = "100%";
    boxDimension.height = Math.min(rect.width / ratio, rect.height);
  }

  return (
    <Box
      w="100%"
      h="100%"
      ref={mergeRefs(resizeRef, ref)}
      pos="relative"
      style={
        center
          ? {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }
          : undefined
      }
    >
      <Box
        w={boxDimension.width}
        h={boxDimension.height}
        pos="relative"
        {...rest}
      >
        {children}
      </Box>
    </Box>
  );
});
