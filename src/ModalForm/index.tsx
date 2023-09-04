import { Form, FormProps, Modal, ModalProps } from 'antd';
import React, { useState } from 'react';
type ModalFormItems = {
  /**
   * 触发弹窗的内容
   */
  trigger: React.ReactNode;
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
}: ModalFormItems & FormProps) => {
  // const { confirm } = Modal;
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    onOk?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  ) => {
    if (onOk) {
      onOk(e);
    }
    (formProps.form || form).submit();
    setIsModalOpen(false);
  };

  const handleCancel = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    onCancel?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  ) => {
    if (onCancel) {
      onCancel(e);
    }
    setIsModalOpen(false);
  };
  return (
    <>
      <div onClick={showModal}>{trigger}</div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        {...modalProps}
        onOk={(e) => handleOk(e, modalProps?.onOk)}
        onCancel={(e) => handleCancel(e, modalProps?.onCancel)}
      >
        <Form form={form} {...formProps}>
          {children}
        </Form>
      </Modal>
    </>
  );
};

export default ModalForm;
