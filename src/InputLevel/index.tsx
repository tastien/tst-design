import { Checkbox, Form, FormInstance, InputNumber, Space } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import * as React from 'react';

interface InputLevelProps {
  form: FormInstance;
  file?: {
    orderName: string;
    topName: string;
  };
}

const InputLevel = ({
  form,
  file = { orderName: 'order', topName: 'top' },
}: InputLevelProps) => {
  const [orderTop, setOrderTop] = React.useState(false);
  const { top } = form.getFieldsValue(['top']);
  const { order } = form.getFieldsValue(['order']);

  const changeTop = (e: CheckboxValueType[]) => {
    setOrderTop(!!e?.[0]);
    if (e?.[0]) {
      form.setFieldsValue({
        order: 9999,
      });
    } else {
      form.setFieldsValue({
        order,
      });
    }
  };

  return (
    <Space>
      <Form.Item
        name={file.orderName}
        noStyle
        style={{ marginRight: 10 }}
        rules={[
          {
            required: !top?.[0],
            message: '请输入优先级',
          },
        ]}
      >
        <InputNumber
          min={0}
          precision={0}
          disabled={orderTop}
          placeholder="数字越大越靠前"
          style={{ width: 150 }}
          max={9999}
        />
      </Form.Item>
      <Form.Item noStyle name={file.topName}>
        {
          <Checkbox.Group onChange={changeTop}>
            <Checkbox value={true}>最高优先级</Checkbox>
          </Checkbox.Group>
        }
      </Form.Item>
    </Space>
  );
};

export default InputLevel;
