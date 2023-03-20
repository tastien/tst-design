import { Checkbox, Form, FormItemProps, Radio } from 'antd';
import * as React from 'react';
import TimeInterval from '../TimeInterval';

type AvailableTimeFormItemProps = FormItemProps & {
  name: string | string[];
};

interface props {
  maxCount?: number;
  disabled?: boolean;
  itemMarginBottom?: string;
  formItemProps?: {
    fullTime: AvailableTimeFormItemProps;
    weeks: AvailableTimeFormItemProps;
    times: AvailableTimeFormItemProps;
  };
}

export const dayOptions = [
  { label: '周一', value: '1' },
  { label: '周二', value: '2' },
  { label: '周三', value: '3' },
  { label: '周四', value: '4' },
  { label: '周五', value: '5' },
  { label: '周六', value: '6' },
  { label: '周日', value: '7' },
];

const AvailableTime = React.memo<props>(
  ({
    maxCount = 3,
    disabled = false,
    formItemProps = {
      fullTime: {
        name: 'fullTime',
        label: '可用时间',
      },
      weeks: {
        name: 'weeks',
        label: '周期',
      },
      times: {
        name: 'times',
        label: '时段',
      },
    },
  }) => {
    return (
      <>
        <Form.Item
          label={formItemProps?.fullTime?.label}
          required={formItemProps?.fullTime?.required}
          rules={[{ required: true, message: '请选择' }]}
          initialValue={true}
          {...formItemProps?.fullTime}
        >
          <Radio.Group disabled={disabled}>
            <Radio value={true}>全时段</Radio>
            <Radio value={false}>指定时段</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item noStyle dependencies={[formItemProps.fullTime.name]}>
          {({ getFieldValue }) => {
            const fullTime = getFieldValue(formItemProps.fullTime.name);
            return (
              !fullTime && (
                <>
                  <Form.Item
                    rules={[{ required: true, message: `请选择周期` }]}
                    initialValue={dayOptions.map((item) => item.value)}
                    {...formItemProps.weeks}
                  >
                    <Checkbox.Group disabled={disabled} options={dayOptions} />
                  </Form.Item>
                  <TimeInterval
                    maxCount={maxCount}
                    disabled={disabled}
                    formItemProps={formItemProps.times}
                  />
                </>
              )
            );
          }}
        </Form.Item>
      </>
    );
  },
);

export default AvailableTime;
