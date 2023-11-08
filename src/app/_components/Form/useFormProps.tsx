import { useMemo } from "react";

export interface Field {
  name?: string;
  defaultValue?: string | boolean;
  [key: string]: any;
}

export const useFormProps = (fields: Field[]) => {
  const memoizedResult = useMemo(() => {
    let initialValues = {};
    let validate = {};

    fields.forEach((field) => {
      if (field?.name) {
        initialValues[field?.name] =
          field?.defaultValue !== undefined
            ? field?.defaultValue
            : field?.blockType === "checkbox"
            ? false
            : "";
      }

      if (field?.name) {
        validate[field?.name] = (value) => {
          if (
            field?.required &&
            typeof value === "string" &&
            value.trim().length === 0
          ) {
            return "Обязательно";
          }

          if (field?.required && field?.blockType === "checkbox" && !value) {
            return "Обязательно";
          }

          if (
            field?.blockType === "email" &&
            !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
          ) {
            return "Email недействителен";
          }

          return null;
        };
      }
    });

    return {
      initialValues,
      validate,
    };
  }, [fields]);

  return memoizedResult;
};
