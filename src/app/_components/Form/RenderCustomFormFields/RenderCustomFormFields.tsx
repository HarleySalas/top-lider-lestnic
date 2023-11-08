import { Form } from "@/payload-types";
import React from "react";
import { Grid } from "@mantine/core";
import {
  Checkbox,
  Email,
  Message,
  Radio,
  Select,
  Text,
  Textarea,
} from "./Fields";

type RenderCustomFormFields = {
  form: any;
  fields: Form["fields"];
};

const fieldComponents = {
  message: Message,
  radio: Radio,
  text: Text,
  email: Email,
  select: Select,
  checkbox: Checkbox,
  textarea: Textarea,
};

export const RenderCustomFormFields: React.FC<RenderCustomFormFields> = ({
  form,
  fields,
}) => {
  const hasFields = fields && Array.isArray(fields) && fields.length > 0;

  if (hasFields) {
    return (
      <Grid columns={100} gutter="lg">
        {fields.map((field, index) => {
          const { blockType } = field;

          if (blockType && blockType in fieldComponents) {
            const Field = fieldComponents[blockType] as any;

            if (Field) {
              return (
                <Grid.Col
                  key={`${field.id}-${field.blockType}-${index}`}
                  span={"width" in field && field?.width ? field?.width : 100}
                >
                  <Field {...field} form={form} />
                </Grid.Col>
              );
            }
          }
        })}
      </Grid>
    );
  }
};
