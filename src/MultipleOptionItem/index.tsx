import {
  Form,
  FormItemProps,
  Input,
  InputProps,
  Select,
  SelectProps,
} from 'antd';
import { Rule } from 'antd/lib/form';
import { GroupProps } from 'antd/lib/input';
import cx from 'classnames';
import * as React from 'react';
import './index.less';

const { Option } = Select;

interface InputMultipleOptionIProps extends FormItemProps {
  options: { name: React.ReactNode; value: string | number }[];
  inputItemName: string;
  optionItemName?: string;
  inputGroupProps?: GroupProps;
  selectProps?: SelectProps;
  inputProps?: InputProps;
  inputRules?: Rule[];
  inputStyle?: React.CSSProperties;
  maxLength?: number;
}

const InputMultipleOption = ({
  options,
  inputItemName,
  selectProps,
  inputProps,
  inputGroupProps,
  optionItemName = 'searchType',
  inputRules,
  inputStyle,
  maxLength = 20,
  ...rest
}: InputMultipleOptionIProps) => {
  const [placeholder, setPlaceholder] = React.useState(
    `请输入${options?.[0].name || '...'}`,
  );
  return (
    <Form.Item {...rest}>
      <Input.Group compact {...inputGroupProps} style={{ display: 'flex' }}>
        <Form.Item noStyle name={optionItemName}>
          <Select
            onChange={(value: string) => {
              setPlaceholder(
                `请输入${
                  options.find((option) => option.value === value)?.name ||
                  '...'
                }`,
              );
            }}
            {...selectProps}
            className={cx(
              'tst-multiple-option-Input-form-select',
              selectProps?.className,
            )}
          >
            {options.map(({ name, value }) => (
              <Option key={value} value={value}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item noStyle name={inputItemName} rules={inputRules}>
          <Input
            placeholder={placeholder}
            allowClear
            maxLength={maxLength}
            style={inputStyle}
            {...inputProps}
            className={cx(
              'tst-multiple-option-Input-form-select-input',
              inputProps?.className,
            )}
          />
        </Form.Item>
      </Input.Group>
    </Form.Item>
  );
};

export default InputMultipleOption;
