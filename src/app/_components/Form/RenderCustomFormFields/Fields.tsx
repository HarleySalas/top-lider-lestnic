import {
  TextInput,
  Select as MantineSelect,
  Checkbox as MantineCheckbox,
  Textarea as MantineTextarea,
  Radio as MantineRadio,
  Group,
  Stack,
} from "@mantine/core";
import { RichTextLexical } from "@/_components/RichTextLexical";

export const Text = ({ name, label, description, form }) => {
  return (
    <TextInput
      label={label}
      description={description}
      {...form.getInputProps(name)}
    />
  );
};

export const Email = ({ name, label, description, form }) => {
  return (
    <TextInput
      label={label}
      description={description}
      {...form.getInputProps(name)}
    />
  );
};

export const Message = ({ richText }) => {
  return <RichTextLexical content={richText} />;
};

export const Radio = ({
  name,
  label,
  description,
  orientation,
  options,
  form,
}) => {
  const Wrapper = orientation === "horizontal" ? Group : Stack;
  return (
    <MantineRadio.Group
      label={label}
      description={description}
      {...form.getInputProps(name)}
    >
      <Wrapper>
        {options.map((option, index) => (
          <MantineRadio
            key={`${option?.id}-${index}`}
            value={option.value}
            label={option.label}
          />
        ))}
      </Wrapper>
    </MantineRadio.Group>
  );
};

export const Select = ({ name, label, description, options, form }) => {
  return (
    <MantineSelect
      label={label}
      description={description}
      data={options}
      {...form.getInputProps(name)}
    />
  );
};

export const Checkbox = ({ name, label, description, form }) => {
  return (
    <MantineCheckbox
      label={label}
      description={description}
      {...form.getInputProps(name)}
    />
  );
};

export const Textarea = ({ name, label, description, form }) => {
  return (
    <MantineTextarea
      label={label}
      description={description}
      {...form.getInputProps(name)}
    />
  );
};
