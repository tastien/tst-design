import { Row, Select } from 'antd';
import moment, { Moment } from 'moment';
import React, { useMemo, useState } from 'react';
import QuickDateSelect from './components/QuickDateSelect';
import {
  DateRenderProps,
  DATE_TYPE_OPTION,
  DATE_TYPE_OPTIONS,
  ValueEnums,
} from './enum';

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
  rangeLimit?: number;
};

const DateSelectFilter = ({
  type = 'default',
  className,
  defaultDateType,
  onChange,
  defaultValue,
  endMoment = moment().endOf('day').subtract(1, 'days'),
  picks = ['DAY_1', 'DAY_7', 'DAY_30', 'CUSTOM'],
  rangeLimit = 31,
  ...restProps
}: DateSelectFilterProps) => {
  const dateTypeOptions: DATE_TYPE_OPTION[] = useMemo(
    () =>
      picks.map(
        (pick) =>
          DATE_TYPE_OPTIONS.find(
            (item) => item.value === pick,
          ) as DATE_TYPE_OPTION,
      ),
    [],
  );

  const [dateType, setDateType] = useState(
    defaultDateType || dateTypeOptions[0].value,
  );

  const dateTypeOption = dateTypeOptions.find(
    (item) => item.value === dateType,
  );
  const DateRender = dateTypeOption?.DateRender;

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
        {dateTypeOptions.map(({ label, value }) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select>
      {DateRender && (
        <DateRender
          {...restProps}
          rangeLimit={rangeLimit}
          defaultValue={defaultValue}
          endMoment={endMoment}
          onChange={handleDatePickerChange}
        />
      )}
    </Row>
  );
};

export default DateSelectFilter;
