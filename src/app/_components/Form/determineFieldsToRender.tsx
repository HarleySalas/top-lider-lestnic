import { Form } from "@/payload-types";

type DetermineFieldstoRenderProps = {
  type: Form["type"];
  fields: Form["fields"];
  steps: Form["steps"];
  currentStep: number;
};

export const determineFieldsToRender: (
  props: DetermineFieldstoRenderProps
) => Form["fields"] = ({ type, fields, steps, currentStep }) => {
  if (type === "standard") {
    return fields;
  }

  if (type === "multiStep") {
    const stepFields = steps.map(({ fields }) => fields);
    return stepFields[currentStep];
  }
};
