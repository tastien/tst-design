import { Form, FormProps, Modal, ModalProps } from 'antd';
import React, { useState } from 'react';
type ModalFormProps = {
  /**
   * 触发弹窗的内容
   */
  trigger?: React.ReactNode;
  /**
   * Modal的属性
   */
  modalProps?: ModalProps;
  /**
   * 表单内容
   */
  children: React.ReactNode;
};

const ModalForm = ({
  trigger,
  children,
  modalProps,
  ...formProps
}: ModalFormProps & FormProps) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancel = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    onCancel?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  ) => {
    e.preventDefault();
    if (onCancel) {
      onCancel(e);
    }
    setIsModalOpen(false);
    (formProps.form || form).resetFields();
  };

  return (
    <>
      {trigger && <div onClick={() => setIsModalOpen(true)}>{trigger}</div>}
      <Modal
        title="Basic Modal"
        confirmLoading={confirmLoading}
        open={isModalOpen}
        {...modalProps}
        cancelButtonProps={{
          disabled: modalProps?.confirmLoading || confirmLoading,
          ...modalProps?.cancelButtonProps,
        }}
        onOk={() => {
          setConfirmLoading(true);
          (formProps.form || form).submit();
        }}
        onCancel={(e) => handleCancel(e, modalProps?.onCancel)}
      >
        <Form
          form={form}
          {...formProps}
          onFinish={async (e) => {
            if (formProps?.onFinish) {
              await formProps?.onFinish(e);
            }
            setIsModalOpen(false);
            setConfirmLoading(false);
            (formProps.form || form).resetFields();
          }}
        >
          {children}
        </Form>
      </Modal>
    </>
  );
};

export default ModalForm;