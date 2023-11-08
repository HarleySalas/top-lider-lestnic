import { Form } from "@/payload-types";

type GetFieldsProps = {
  type: Form["type"];
  fields: Form["fields"];
  steps: Form["steps"];
};

export const getFields: (props: GetFieldsProps) => Form["fields"] = ({
  type,
  fields,
  steps,
}) => {
  return type === "standard"
    ? fields
    : steps
        .map(({ fields }) => fields)
        .reduce((acc, item) => acc.concat(item), []);
};
