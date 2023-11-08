import { Form as CustomForm } from "@/payload-types";
import { Modal, ModalProps, Title } from "@mantine/core";
import React from "react";
import { Form } from "../Form";

interface FormModalType extends ModalProps {
  data: CustomForm;
}

export interface Field {
  name?: string;
  defaultValue?: string | boolean;
  [key: string]: any;
}

export const FormModal: React.FC<FormModalType> = ({
  opened,
  onClose,
  data,
  ...rest
}) => {
  return (
    <Modal.Root opened={opened} onClose={onClose} {...rest} size="lg">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header p="xl">
          <Title order={2} size="xl" fw={600}>
            {data?.title}
          </Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body pr="xl" pb="xl" pl="xl">
          <Form data={data} onSuccess={onClose} modal />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
