import { Row, Select } from 'antd';
import moment, { Moment } from 'moment';
import React, { useMemo, useState } from 'react';
import QuickDateSelect from './components/QuickDateSelect';
import { DateRenderProps, DATE_SELECT_OPTIONS, ValueEnums } from './enum';

type Value = [Moment[], string[], ValueEnums];

export type DateSelectFilterProps = Pick<
  DateRenderProps,
  'disabledDate' | 'defaultValue'
> & {
  type?: 'default' | 'quick';
  className?: string;
  picks?: ValueEnums[];
  defaultDateType?: ValueEnums;
  onChange?: (...args: Value) => void;
  endMoment?: Moment;
};

const DateSelectFilter = ({
  type = 'default',
  className,
  defaultDateType,
  onChange,
  defaultValue,
  endMoment = moment().endOf('day').subtract(1, 'days'),
  picks = ['DAY_1', 'DAY_7', 'DAY_30', 'CUSTOM'],
  ...restProps
}: DateSelectFilterProps) => {
  const showOptions = useMemo(
    () =>
      picks.map(
        (pick) => DATE_SELECT_OPTIONS.find((item) => item.value === pick)!,
      ),
    [],
  );
  const initDateType = defaultDateType || showOptions[0].value;
  const [dateType, setDateType] = useState(initDateType);

  const selectedDateOption = showOptions.find(
    (item) => item.value === dateType,
  );
  const DateRender = selectedDateOption?.DateRender;

  const handleDatePickerChange = (values: moment.Moment[]) => {
    onChange?.(
      values,
      values.map((m) => m.format('YYYY-MM-DD')),
      dateType,
    );
  };

  if (type === 'quick') {
    return (
      <QuickDateSelect
        onChange={handleDatePickerChange}
        endMoment={endMoment}
        picks={picks}
        defaultValue={defaultValue}
      />
    );
  }

  return (
    <Row align="middle" className={className}>
      <Select
        defaultValue={dateType}
        value={dateType}
        style={{ width: 120, marginRight: 8 }}
        onChange={setDateType}
      >
        {showOptions.map(({ label, value }) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select>
      {DateRender && (
        <DateRender
          {...restProps}
          defaultValue={defaultValue}
          endMoment={endMoment}
          onChange={handleDatePickerChange}
        />
      )}
    </Row>
  );
};

export default DateSelectFilter;
