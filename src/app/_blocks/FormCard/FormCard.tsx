"use client";
import { Form } from "@/_components/Form";
import { Form as FormProps, FormCardProps } from "@/payload-types";
import { Card } from "@mantine/core";

export const FormCard: React.FC<FormCardProps> = ({ form }) => {
  return (
    <>
      <Card
        p="xl"
        withBorder
        shadow="md"
        radius="md"
        maw={742}
        mx="auto"
        mt={56}
      >
        <Form data={form as FormProps} />
      </Card>
    </>
  );
};
