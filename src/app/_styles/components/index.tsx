import {
  Button,
  Text,
  Title,
  List,
  TextInput,
  Textarea,
  Select,
  rem,
  Container,
  Tabs,
  Radio,
} from "@mantine/core";
import textClasses from "./Text.module.css";
import titleClasses from "./Title.module.css";
import { buttonProps } from "./Button";
import { listProps } from "./List";
import { textInputProps } from "./TextInput";
import { textareaProps } from "./Textarea";
import { selectProps } from "./Select";
import { tabsProps } from "./Tabs";
import { radioGroupProps } from "./Radio";

const Components = {
  Text: Text.extend({ classNames: textClasses }),
  Title: Title.extend({ classNames: titleClasses }),
  Tabs: Tabs.extend({ defaultProps: tabsProps }),
  Button: Button.extend({
    defaultProps: buttonProps,
    vars: (theme, props) => {
      if (props.size === "sm") {
        return {
          root: {
            "--buton-fz": rem(14),
          },
        };
      }
      if (props.size === "md") {
        return {
          root: {
            "--button-fz": rem(16),
          },
        };
      }
      if (props.size === "lg") {
        return {
          root: {
            "--button-fz": rem(18),
          },
        };
      }
      return { root: {} };
    },
  }),
  List: List.extend({ defaultProps: listProps }),
  TextInput: TextInput.extend({ defaultProps: textInputProps }),
  Textarea: Textarea.extend({ defaultProps: textareaProps }),
  Select: Select.extend({ defaultProps: selectProps }),
  Radio: Radio.extend({
    //@ts-ignore
    vars: (theme, props) => {
      if (props.color === "brandPrimary" || !props.color) {
        return {
          root: {
            "--_radio-icon-color": theme.colors.dark[4],
          },
        };
      }
      return { root: {} };
    },
  }),
  RadioGroup: Radio.Group.extend({
    defaultProps: radioGroupProps,
  }),
  Container: Container.extend({ defaultProps: { size: "xl" } }),
};

export default Components;
