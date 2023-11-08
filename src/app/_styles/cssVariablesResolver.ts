import { MantineTheme } from '@mantine/core'

export const cssVariablesResolver = (theme: MantineTheme) => ({
  variables: {},
  light: {
    '--mantine-color-text': theme.colors.dark[2],
    '--mantine-color-dimmed': theme.colors.gray[7],
  },
  dark: {},
})

//dark variables must be done in global.css, since we are not changing mantine-color-scheme on the root element for dark sections.
