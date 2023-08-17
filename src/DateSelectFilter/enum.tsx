import { DatePicker, Space } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import moment, { Moment } from 'moment';
import React, { ReactNode, useEffect, useState } from 'react';
import CustomRangePicker from './components/CustomRangePicker';

const { RangePicker } = DatePicker;

export type ValueEnums =
  | 'DAY_0'
  | 'DAY_1'
  | 'DAY_2'
  | 'DAY_7'
  | 'DAY_15'
  | 'DAY_30'
  | 'DAY_180'
  | 'CURRENT_WEEK'
  | 'LAST_WEEK'
  | 'CURRENT_MONTH'
  | 'LAST_MONTH'
  | 'CUSTOM'
  | 'WEEK'
  | 'MONTH'
  | 'DATE';

export type DateRenderProps = {
  rangeLimit?: number;
  disabledDate?: RangePickerProps<Moment>['disabledDate'];
  defaultValue?: Moment[];
  value?: Moment[];
  endMoment: Moment;
  onChange: (dateInfo: Moment[]) => void;
};

export type DATE_TYPE_OPTION = {
  value: ValueEnums;
  label: ReactNode;
  DateRender: React.FC<DateRenderProps>;
  time?: Moment[];
};

export const DATE_TYPE_OPTIONS: DATE_TYPE_OPTION[] = [
  {
    value: 'DAY_0' as const,
    label: '今天',
    DateRender: ({ onChange }) => {
      useEffect(() => {
        onChange([moment().endOf('day'), moment().endOf('day')]);
      }, []);
      return <DatePicker disabled value={moment().endOf('day')} />;
    },
  },
  {
    value: 'DAY_1' as const,
    label: '昨天',
    DateRender: ({ onChange }) => {
      const endMoment = moment().endOf('day').subtract(1, 'days');
      useEffect(() => {
        onChange([endMoment, endMoment]);
      }, []);
      return <DatePicker disabled value={endMoment} />;
    },
  },
  {
    value: 'DAY_2' as const,
    label: '前天',
    DateRender: ({ onChange }) => {
      const endMoment = moment().endOf('day').subtract(2, 'days');
      useEffect(() => {
        onChange([endMoment, endMoment]);
      }, []);
      return <DatePicker disabled value={endMoment} />;
    },
  },
  {
    value: 'DAY_7' as const,
    label: '近 7 天',
    DateRender: ({ endMoment, onChange }) => {
      const rangeData = [endMoment.clone().subtract(6, 'days'), endMoment];
      useEffect(() => {
        onChange(rangeData);
      }, []);
      return <RangePicker disabled value={rangeData} />;
    },
  },
  {
    value: 'DAY_15' as const,
    label: '近 15 天',
    DateRender: ({ endMoment, onChange }) => {
      const rangeData = [endMoment.clone().subtract(14, 'days'), endMoment];
      useEffect(() => {
        onChange(rangeData);
      }, []);
      return <RangePicker disabled value={rangeData} />;
    },
  },
  {
    value: 'DAY_30' as const,
    label: '近 30 天',
    DateRender: ({ endMoment, onChange }) => {
      const rangeData = [endMoment.clone().subtract(29, 'days'), endMoment];
      useEffect(() => {
        onChange(rangeData);
      }, []);
      return <RangePicker disabled value={rangeData} />;
    },
  },
  {
    value: 'DAY_180' as const,
    label: '近 180 天',
    DateRender: ({ endMoment, onChange }) => {
      const rangeData = [endMoment.clone().subtract(179, 'days'), endMoment];
      useEffect(() => {
        onChange(rangeData);
      }, []);
      return <RangePicker disabled value={rangeData} />;
    },
  },
  {
    value: 'CURRENT_WEEK' as const,
    label: '本周',
    DateRender: ({ endMoment, onChange }) => {
      const rangeData = [moment().startOf('week'), endMoment];
      useEffect(() => {
        onChange(rangeData);
      }, []);
      return <RangePicker disabled value={rangeData} />;
    },
  },
  {
    value: 'LAST_WEEK' as const,
    label: '上周',
    DateRender: ({ endMoment, onChange }) => {
      const end = endMoment.clone().subtract(7, 'days').endOf('week');
      const rangeData = [end.clone().startOf('week'), end];
      useEffect(() => {
        onChange(rangeData);
      }, []);
      return <RangePicker disabled value={rangeData} />;
    },
  },
  {
    value: 'CURRENT_MONTH' as const,
    label: '本月',
    DateRender: ({ endMoment, onChange }) => {
      const rangeData = [moment().startOf('month'), endMoment];
      useEffect(() => {
        onChange(rangeData);
      }, []);
      return <RangePicker disabled value={rangeData} />;
    },
  },
  {
    value: 'LAST_MONTH' as const,
    label: '上月',
    DateRender: ({ endMoment, onChange }) => {
      const end = endMoment.clone().startOf('month').subtract(1, 'days');
      const rangeData = [end.clone().startOf('month'), end];
      useEffect(() => {
        onChange(rangeData);
      }, []);
      return <RangePicker disabled value={rangeData} />;
    },
  },
  {
    value: 'WEEK' as const,
    label: '自然周',
    DateRender: ({ defaultValue, disabledDate, endMoment, onChange }) => {
      const realEndMoment = endMoment.subtract(endMoment.get('day'), 'days');

      const [time, setTime] = useState(() => {
        if (
          defaultValue &&
          defaultValue[0].get('day') === 1 &&
          defaultValue[1].diff(defaultValue[0], 'day') === 6
        ) {
          return defaultValue[0];
        }
        return realEndMoment.clone().startOf('week');
      });

      useEffect(() => {
        onChange([time.clone(), time.clone().endOf('week')]);
      }, [time]);

      return (
        <Space>
          <DatePicker
            allowClear={false}
            disabledDate={
              disabledDate || ((m: Moment) => m.isAfter(realEndMoment))
            }
            value={time}
            onChange={(m: any) => setTime(m!.startOf('week'))}
          />
          &nbsp;&nbsp;~&nbsp;&nbsp;
          <DatePicker disabled value={time.clone().endOf('week')} />
        </Space>
      );
    },
  },
  {
    value: 'MONTH' as const,
    label: '自然月',
    DateRender: ({ defaultValue, disabledDate, endMoment, onChange }) => {
      const realEndMoment = endMoment
        .clone()
        .add(1, 'days')
        .subtract(1, 'month')
        .endOf('month');
      const [month, setMonth] = useState(() => {
        return defaultValue && defaultValue[0].isBefore(realEndMoment)
          ? defaultValue[0]
          : realEndMoment;
      });

      useEffect(() => {
        onChange([
          month.clone().startOf('month'),
          month.clone().endOf('month'),
        ]);
      }, [month]);

      return (
        <DatePicker
          picker="month"
          allowClear={false}
          disabledDate={
            disabledDate || ((m: Moment) => m.isAfter(realEndMoment))
          }
          value={month}
          onChange={setMonth as any}
        />
      );
    },
  },
  {
    value: 'DATE',
    label: '自然日',
    DateRender: ({ defaultValue, disabledDate, endMoment, onChange }) => {
      const [date, setDate] = useState(() =>
        defaultValue ? defaultValue[0] : endMoment,
      );

      useEffect(() => {
        onChange([date.clone(), date.clone()]);
      }, [date]);

      return (
        <DatePicker
          allowClear={false}
          value={date}
          disabledDate={disabledDate || ((m: Moment) => m.isAfter(endMoment))}
          onChange={setDate}
        />
      );
    },
  },
  {
    value: 'CURRENT_WEEK' as const,
    label: '本周',
    DateRender: ({ onChange }) => {
      const rangeData = [moment().startOf('week'), moment().endOf('week')];
      useEffect(() => {
        onChange(rangeData);
      }, []);
      return <RangePicker disabled value={rangeData as any} />;
    },
  },
  {
    value: 'LAST_WEEK' as const,
    label: '上周',
    DateRender: ({ onChange }) => {
      const rangeData = [
        moment().subtract(1, 'week').startOf('week'),
        moment().subtract(1, 'week').endOf('week'),
      ];
      useEffect(() => {
        onChange(rangeData);
      }, []);
      return <RangePicker disabled value={rangeData} />;
    },
  },
  {
    value: 'CURRENT_MONTH' as const,
    label: '本月',
    DateRender: ({ onChange }) => {
      const rangeData = [moment().startOf('month'), moment().endOf('month')];
      useEffect(() => {
        onChange(rangeData);
      }, []);
      return <RangePicker disabled value={rangeData} />;
    },
  },
  {
    value: 'LAST_MONTH' as const,
    label: '上月',
    DateRender: ({ onChange }) => {
      const rangeData = [
        moment().subtract(1, 'month').startOf('month'),
        moment().subtract(1, 'month').endOf('month'),
      ];
      useEffect(() => {
        onChange(rangeData);
      }, []);
      return <RangePicker disabled value={rangeData} />;
    },
  },
  {
    value: 'CUSTOM' as const,
    label: '自定义',
    DateRender: ({
      defaultValue,
      disabledDate,
      rangeLimit,
      endMoment,
      onChange,
      value,
    }) => {
      const initValue = value || defaultValue;
      const startMoment = initValue ? initValue[0] : endMoment;

      const [valueState, setValueState] = useState(() => [
        startMoment,
        endMoment,
      ]);

      useEffect(() => {
        onChange(valueState);
      }, [valueState]);

      return (
        <CustomRangePicker
          allowClear={false}
          disabledDate={disabledDate || ((m: Moment) => m.isAfter(endMoment))}
          value={valueState}
          rangeLimit={rangeLimit}
          onChange={setValueState as any}
        />
      );
    },
  },
];

export const getDataRanges = (endMoment: Moment) => {
  return [
    {
      value: 'DAY_0' as const,
      label: '今天',
      time: [endMoment, endMoment],
    },
    {
      value: 'DAY_1' as const,
      label: '昨天',
      time: [endMoment.clone().subtract(1, 'days'), endMoment],
    },
    {
      value: 'DAY_2' as const,
      label: '前天',
      time: [endMoment.clone().subtract(2, 'days'), endMoment],
    },
    {
      value: 'DAY_7' as const,
      label: '近 7 天',
      time: [endMoment.clone().subtract(6, 'days'), endMoment],
    },
    {
      value: 'DAY_15' as const,
      label: '近 15 天',
      time: [endMoment.clone().subtract(14, 'days'), endMoment],
    },
    {
      value: 'DAY_30' as const,
      label: '近 30 天',
      time: [endMoment.clone().subtract(29, 'days'), endMoment],
    },
    {
      value: 'DAY_180' as const,
      label: '近 180 天',
      time: [endMoment.clone().subtract(179, 'days'), endMoment],
    },
    {
      value: 'CURRENT_WEEK' as const,
      label: '本周',
      time: [moment().startOf('week'), endMoment],
    },
    {
      value: 'LAST_WEEK' as const,
      label: '上周',
      time: [
        endMoment
          .clone()
          .subtract(7, 'days')
          .endOf('week')
          .clone()
          .startOf('week'),
        endMoment.clone().subtract(7, 'days').endOf('week'),
      ],
    },
    {
      value: 'CURRENT_MONTH' as const,
      label: '本月',
      time: [moment().startOf('month'), endMoment],
    },
    {
      value: 'LAST_MONTH' as const,
      label: '上月',
      time: [
        endMoment
          .clone()
          .startOf('month')
          .subtract(1, 'days')
          .clone()
          .startOf('month'),
        endMoment.clone().startOf('month').subtract(1, 'days'),
      ],
    },
  ];
};
