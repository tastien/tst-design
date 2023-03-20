import { Nullable } from '@shihengtech/hooks/lib/utils';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import { Moment } from 'moment';
import * as React from 'react';
const { RangePicker } = DatePicker;

interface CustomRangePickerProps<T>
  extends Omit<RangePickerProps<T>, 'open' | 'onOpenChange'> {
  rangeLimit?: number | false;
}

type OnChangeType = Required<RangePickerProps<Moment>>['onChange'];

function CustomRangePicker({
  defaultValue,
  onChange,
  disabledDate,
  rangeLimit,
  ...restProps
}: CustomRangePickerProps<Moment>) {
  const controlled = 'value' in restProps;
  const [innerValue, setInnerValue] = React.useState(() =>
    controlled ? restProps.value : defaultValue,
  );
  const payloadRef = React.useRef<{
    open: boolean;
    payload: Nullable<Parameters<OnChangeType>>;
  }>({
    open: false,
    payload: null,
  });

  const [dates, setDates] =
    React.useState<RangePickerProps<Moment>['value']>(null);

  const triggerChange: OnChangeType = (...args) => {
    if (!controlled) {
      setInnerValue(args[0]);
    }
    if (onChange) onChange(...args);
  };

  const mergedValue = controlled ? restProps.value : innerValue;

  // @ts-ignore
  const props: RangePickerProps<Moment> = {
    disabledDate: (m: Moment) => {
      return (
        (disabledDate && disabledDate(m)) ||
        (!!rangeLimit &&
          !!dates &&
          ((!!dates[0] && m.diff(dates[0], 'days') >= rangeLimit) ||
            (!!dates[1] && dates[1].diff(m, 'days') >= rangeLimit)))
      );
    },
    value: dates || mergedValue,
  };

  return (
    <RangePicker
      {...restProps}
      {...props}
      onOpenChange={(open) => {
        if (open) {
          if (controlled) setInnerValue(restProps.value);
        } else {
          if (payloadRef.current.payload) {
            triggerChange(...payloadRef.current.payload);
            payloadRef.current.payload = null;
          }
          setDates(null);
        }
        payloadRef.current.open = open;
      }}
      onChange={(...args) => {
        if (payloadRef.current.open) return;
        triggerChange(...args);
      }}
      onCalendarChange={(value) => {
        const nextValue: [Moment | null, Moment | null] =
          mergedValue && value
            ? value.map((v, i) => (v === mergedValue[i] ? null : v))
            : (value as any);
        if (nextValue?.filter((v) => !!v).length === 2) {
          payloadRef.current.payload = [
            nextValue,
            nextValue!.map((m) => m!.format('YYYY-MM-DD')) as any,
          ];
        }
        setDates(nextValue as any);
      }}
    />
  );
}

CustomRangePicker.defaultProps = {
  rangeLimit: 31,
};

export default CustomRangePicker;
