import { Checkbox, Form, FormItemProps, Radio, RadioGroupProps } from 'antd';
import * as React from 'react';
import TimeInterval from '../TimeInterval';

type AvailableTimeFormItemProps = FormItemProps & {
  name: string | string[];
};

interface props {
  maxCount?: number;
  disabled?: boolean;
  supportNextDay?: boolean;
  radioGroupProps?: RadioGroupProps;
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
    supportNextDay,
    radioGroupProps = {
      options: [
        {
          label: '全时段',
          value: true,
        },
        {
          label: '指定时段',
          value: false,
        },
      ],
    },
    formItemProps = {
      fullTime: {
        name: 'fullTime',
      },
      weeks: {
        name: 'weeks',
      },
      times: {
        name: 'times',
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
          <Radio.Group {...radioGroupProps} disabled={disabled} />
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
                    supportNextDay={supportNextDay}
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
