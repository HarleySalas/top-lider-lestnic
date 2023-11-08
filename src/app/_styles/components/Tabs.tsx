import { TabsProps } from "@mantine/core";
import classes from "./Tabs.module.css";

export const tabsProps: Partial<TabsProps> = {
  classNames: { tabLabel: classes.tabLabel, tab: classes.tab },
};
