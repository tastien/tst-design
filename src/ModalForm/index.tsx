import { Form, FormInstance, FormProps, Modal, ModalProps } from 'antd';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

type setControllerProps = {
  open?: boolean;
  loading?: boolean;
  idx?: number;
};

export type ModalFormRef<T = any> = FormInstance<T> & {
  setController: (props: setControllerProps) => T;
};

type ModalFormProps = {
  //绑定 Form 的ref
  formRef?: React.MutableRefObject<ModalFormRef>;
  //触发弹窗的内容
  trigger?: React.ReactNode;
  //Modal 的属性
  modalProps?: ModalProps;
  //Modal 的属性
  onFinish?: (e: any, idx: number) => void;
  //表单内容
  children: React.ReactNode;
};

const ModalForm = forwardRef(
  ({
    formRef,
    trigger,
    children,
    modalProps,
    onFinish,
    ...formProps
  }: ModalFormProps & FormProps) => {
    const [form] = Form.useForm();
    const ref = useRef(form);
    const [modalController, setModalController] = useState({
      open: false,
      loading: false,
      idx: 0,
    });
    const { open, loading, idx } = modalController;

    useImperativeHandle(
      formRef,
      () => {
        return {
          ...form,
          setController({ ...rest }) {
            setModalController((m) => {
              return { ...m, ...rest };
            });
          },
        };
      },
      [ref.current],
    );

    return (
      <>
        {trigger && (
          <div
            onClick={() =>
              setModalController({ ...modalController, open: true })
            }
          >
            {trigger}
          </div>
        )}
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
            setModalController({ ...modalController, loading: true });
            form.submit();
          }}
          onCancel={() => {
            setModalController({ ...modalController, open: false });
            form.resetFields();
          }}
        >
          <Form
            {...formProps}
            form={form}
            ref={ref}
            onFinish={async (e) => {
              if (onFinish) {
                await onFinish(e, idx);
              }
              setModalController({
                ...modalController,
                loading: false,
                open: false,
              });
              form.resetFields();
            }}
          >
            {children}
          </Form>
        </Modal>
      </>
    );
  },
);

export default ModalForm;
