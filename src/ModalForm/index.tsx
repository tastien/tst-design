import { Form, FormInstance, FormProps, Modal, ModalProps } from 'antd';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

interface ModalFormProps<T> extends FormProps {
  //触发弹窗的内容
  trigger?: React.ReactNode;
  //表单提交时触发的方法
  onFinish?: (value: T) => void;
  //Modal 的属性
  modalProps?: ModalProps;
  //表单内容
  children?: React.ReactNode;
}

export interface IFormRef<T> extends FormInstance<FormInstance<any>> {
  openModal: (value?: T) => void;
  closeModal: () => void;
}

function ModalForm<T extends Record<string, any>>(
  {
    trigger,
    onFinish,
    children,
    modalProps,
    ...formProps
  }: FormProps & ModalFormProps<T>,
  ref: React.Ref<IFormRef<T>>,
) {
  const [form] = Form.useForm<FormInstance<any>>();
  const formRef = useRef(form);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [defaultValue, setDefaultValue] = useState({});

  useImperativeHandle(ref, () => {
    return {
      ...form,
      openModal(value) {
        if (value) {
          form.setFieldsValue(value);
          setDefaultValue(value);
        }
        setOpen(true);
      },
      closeModal() {
        setOpen(false);
        setDefaultValue({});
      },
    };
  });

  return (
    <>
      {trigger && <div onClick={() => setOpen(true)}>{trigger}</div>}
      <Modal
        title="Basic Modal"
        {...modalProps}
        confirmLoading={loading}
        open={open}
        cancelButtonProps={{
          disabled: loading,
          ...modalProps?.cancelButtonProps,
        }}
        onOk={() => {
          setLoading(true);
          form.submit();
        }}
        onCancel={() => {
          setOpen(false);
          setDefaultValue({});
          form.resetFields();
        }}
      >
        <Form
          {...formProps}
          form={form}
          ref={formRef}
          onFinish={async (value) => {
            if (onFinish) {
              await onFinish({ ...defaultValue, ...value } as unknown as T);
            }
            setLoading(false);
            setOpen(false);
            setDefaultValue({});
            form.resetFields();
          }}
        >
          {children}
        </Form>
      </Modal>
    </>
  );
}

export default forwardRef(ModalForm) as <T extends Record<string, any>>(
  props: ModalFormProps<T> & React.RefAttributes<IFormRef<T>>,
) => React.ReactElement;
