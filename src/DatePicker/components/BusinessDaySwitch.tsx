import { DownOutlined } from '@ant-design/icons';
import * as React from 'react';
import { useState } from 'react';
import { Field, Picker, Popup } from 'react-vant';
import { DatePickerIndexProps } from '..';
import '../index.less';

type BusinessDaySwitchProps = Pick<
  DatePickerIndexProps,
  'onChange' | 'searchBusinessDay'
>;

const BusinessDaySwitch = ({
  onChange,
  searchBusinessDay,
}: BusinessDaySwitchProps) => {
  const defaultDateType = searchBusinessDay ? '营业日' : '自然日';
  const [dateType, setDateType] = useState<string>(defaultDateType);
  const [showDateTypePicker, setDateTypeShowPicker] = useState(false);

  return (
    <>
      <Field
        readonly
        clickable
        value={dateType}
        style={{ width: 120 }}
        rightIcon={<DownOutlined className="tst-date-picker-right-icon" />}
        onClick={() => setDateTypeShowPicker(true)}
      />
      <Popup
        closeable={false}
        visible={showDateTypePicker}
        round={false}
        position="bottom"
        onClose={() => setDateTypeShowPicker(false)}
      >
        <Picker
          title="日期类型"
          columns={searchBusinessDay ? ['营业日', '自然日'] : ['自然日']}
          onConfirm={(value: any) => {
            setDateType(value);
            onChange({
              searchBusinessDay: value === '营业日',
            });
            setDateTypeShowPicker(false);
          }}
          onCancel={() => {
            setDateTypeShowPicker(false);
          }}
        />
      </Popup>
    </>
  );
};

export default BusinessDaySwitch;
