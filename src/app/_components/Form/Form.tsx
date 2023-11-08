import { Form as CustomForm } from "@/payload-types";
import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { getFields } from "./getFields";
import { useFormProps } from "./useFormProps";
import { determineFieldsToRender } from "./determineFieldsToRender";
import { notifications } from "@mantine/notifications";
import { RichTextLexical } from "../RichTextLexical";
import { RenderCustomFormFields } from "./RenderCustomFormFields";

interface FormProps {
  data: CustomForm;
  modal?: boolean;
  onSuccess?: () => void;
}

export const Form: React.FC<FormProps> = ({
  data,
  modal = false,
  onSuccess,
}) => {
  const {
    id,
    title,
    type,
    fields,
    steps,
    confirmationType,
    confirmationMessage,
    redirect,
    submitButtonLabel,
  } = data;

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const allFields = getFields({ type, fields, steps });

  const { initialValues, validate } = useFormProps(allFields);

  const form = useForm({ initialValues, validate });

  const fieldsToRender = useMemo(() => {
    return determineFieldsToRender({ type, fields, steps, currentStep });
  }, [type, fields, steps, currentStep]);

  const handleSubmit = async (values) => {
    setIsLoading(true);

    const dataToSend = Object.entries(values).map(([name, value]) => ({
      field: name,
      value,
    }));

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/custom-form-submissions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            form: id,
            submissionData: dataToSend,
          }),
        }
      );

      onSuccess && onSuccess();

      form.reset();

      if (type === "multiStep") {
        setCurrentStep(0);
      }

      setIsLoading(false);

      if (confirmationType === "message") {
        notifications.show({
          title: "Успешно",
          message: <RichTextLexical content={confirmationMessage} />,
        });
      }

      if (confirmationType === "redirect") {
        redirect?.type === "internal"
          ? router.push(
              typeof redirect?.internal?.value === "object" &&
                redirect?.internal?.value?.pathname
            )
          : window?.open(
              redirect?.external,
              redirect?.newTab ? "_blank" : undefined
            );
      }
    } catch (error) {
      setIsLoading(false);
      notifications.show({
        title: "Ошибка",
        message: "Пожалуйста, попробуйте еще раз.",
        color: "red",
      });
      console.error(error);
    }
  };

  const handleNext = async () => {
    let currentSteps = steps[currentStep].fields;

    const validationPromises = currentSteps?.map((step) =>
      form.validateField("name" in step && step?.name)
    );

    try {
      const results = await Promise.all(validationPromises);

      const noErrors = results.every((validationResult) => {
        return validationResult && validationResult.hasError === false;
      });

      if (noErrors) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1500}
        overlayProps={{ blur: 1 }}
      />
      <Box
        component="form"
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
      >
        {modal ? null : (
          <Title order={2} fw={600} size="xl" mb="md">
            {title}
          </Title>
        )}
        <RenderCustomFormFields form={form} fields={fieldsToRender} />
        <Group justify="space-between" align="flex-end" mt="xl">
          <Group>
            {type === "multiStep" && currentStep !== 0 ? (
              <Button onClick={handlePrev}>Назад</Button>
            ) : null}
            {type === "multiStep" && currentStep + 1 !== steps?.length ? (
              <Button onClick={handleNext}>Далее</Button>
            ) : null}
            {type !== "multiStep" || currentStep + 1 === steps?.length ? (
              <Button type="submit">{submitButtonLabel}</Button>
            ) : null}
          </Group>
          {type === "multiStep" ? (
            <Text size="xs" tt="uppercase" fw={500} c="dimmed" mt={rem(2)}>
              Шаг {currentStep + 1} из {steps?.length}
            </Text>
          ) : null}
        </Group>
      </Box>
    </>
  );
};
