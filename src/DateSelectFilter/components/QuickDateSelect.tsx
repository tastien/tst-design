import { DatePicker } from 'antd';
import { Moment } from 'moment';
import * as React from 'react';
import { DateSelectFilterProps } from '..';
import { getDataRanges } from '../enum';

type QuickDateSelectProps = Pick<
  DateSelectFilterProps,
  'picks' | 'defaultValue'
> & {
  onChange: (value: any) => void;
  endMoment: Moment;
};

const QuickDateSelect = ({
  endMoment,
  picks = ['DAY_1', 'DAY_7', 'DAY_30', 'CUSTOM'],
  onChange,
  defaultValue,
}: QuickDateSelectProps) => {
  const dataRanges = getDataRanges(endMoment);

  const showRanges: any = {};

  dataRanges.forEach((item) => {
    if (picks.includes(item.value)) {
      showRanges[item.label] = item.time;
    }
  });

  React.useEffect(() => {
    if (!defaultValue) {
      onChange(showRanges[Object.keys(showRanges)[0]]);
    }
  }, []);

  return (
    <DatePicker.RangePicker
      allowClear={false}
      defaultValue={showRanges[Object.keys(showRanges)[0]]}
      ranges={showRanges}
      disabledDate={(m: Moment) => m.isAfter(endMoment)}
      onChange={onChange}
    />
  );
};

export default QuickDateSelect;
