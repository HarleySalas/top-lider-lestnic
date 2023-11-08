import {
  VariantColorsResolver,
  defaultVariantColorsResolver,
  parseThemeColor,
} from "@mantine/core";

export const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  if (
    parsedColor.isThemeColor &&
    parsedColor.color === "brandPrimary" &&
    input.variant === "filled"
  ) {
    return {
      ...defaultResolvedColors,
      color: `var(--mantine-color-dark-4)`,
      "--_radio-icon-color": `var(--mantine-color-brandPrimary-9)`,
    };
  }

  if (input.variant === "gradient") {
    return { ...defaultResolvedColors, color: `var(--mantine-color-dark-4)` };
  }

  return defaultResolvedColors;
};
