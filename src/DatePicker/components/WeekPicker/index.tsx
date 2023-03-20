import moment from 'moment';
import * as React from 'react';
import { memo, ReactNode, useEffect, useMemo, useState } from 'react';
import { Picker } from 'react-vant';

const getWeek = (y: any) => {
  const oneDay = moment(y + '-01-01');
  let oneWeek = null;
  if (oneDay.format('wo') === '1周') {
    oneWeek = oneDay.startOf('week').format('YYYY-MM-DD');
  } else {
    oneDay.add(1, 'weeks');
    oneWeek = oneDay.startOf('week').format('YYYY-MM-DD');
  }
  const arr = [];
  let weelyStr = '1周';
  do {
    let d: { value: string; text: string } = { value: '', text: '' };
    let time = moment(oneWeek);
    d.value = `${time.startOf('week').format('MM-DD')}~${time
      .endOf('week')
      .format('MM-DD')}`;

    d.text = time.format('第wo');
    arr.push(d);
    oneDay.add(1, 'weeks');
    oneWeek = oneDay.startOf('week').format('YYYY-MM-DD');
    weelyStr = oneDay.format('wo');
  } while (weelyStr !== '1周' && oneWeek.indexOf(y) > -1);
  return arr;
};

interface IWeekPickerProps {
  value: [any, any];
  title?: any;
  minDate?: Date;
  maxDate?: Date;
  onConfirm: (value: any) => void;
  columnsTop?: ReactNode;
  onDefaultChange?: (values: any) => void;
  onChange?: (values: any) => void;
  onCancel?: () => void;
  disabledToday?: boolean;
}

const currentYear = new Date().getFullYear();

export default memo<IWeekPickerProps>(
  ({
    title,
    columnsTop,
    minDate = new Date(currentYear - 10, 0, 1),
    maxDate = new Date(currentYear + 10, 11, 31),
    onDefaultChange,
    onConfirm,
    onChange,
    onCancel,
    disabledToday,
    value,
  }) => {
    const [year, setYear] = useState<string>(String(currentYear));
    const defaultWeek = disabledToday
      ? moment().subtract(7, 'days').format('第wo')
      : moment().format('第wo');
    const [week, setWeek] = useState<string>(defaultWeek);

    const columns = useMemo(() => {
      const minYear = moment(minDate).get('year');
      const maxYear = moment(maxDate).get('year');
      const cols: any = {};

      for (let i = minYear; i < maxYear; i++) {
        cols[i] = getWeek(i);
      }
      const index = Object.keys(cols)?.findIndex((y) => y === year);
      const weekIndex = cols[year]?.findIndex((w: any) => w.text === week);
      return [
        {
          values: Object.keys(cols).map((col) => {
            return {
              text: `${col}年`,
              value: col,
            };
          }),
          defaultIndex: index,
        },
        {
          values: cols[year],
          defaultIndex: weekIndex,
        },
      ];
    }, [year, week]);

    useEffect(() => {
      if (onDefaultChange) {
        const newColumns = columns.map((column) => {
          return column.values[column.defaultIndex];
        });

        onDefaultChange(
          `${newColumns[0].text}${newColumns[1].text} （${newColumns[1].value}）`,
        );
      }
    }, []);

    useEffect(() => {
      if (value?.length) {
        setYear(value[0]?.value);
        setWeek(value[1]?.text);
      }
    }, [value]);

    return (
      <Picker
        title={title}
        columns={columns}
        columnsTop={columnsTop}
        onCancel={onCancel}
        onChange={(values: any) => {
          const y = values[0];
          setYear(y.value);
          if (onChange) {
            onChange(values);
          }
        }}
        onConfirm={(values: any) => {
          const dates = values[1].value.split('~');
          const datesArray = [
            `${values[0].value}-${dates[0]}`,
            `${values[0].value}-${dates[1]}`,
          ];
          onConfirm({
            dates: datesArray,
            text: `${values[0].text}${values[1].text}`,
          });
        }}
      />
    );
  },
);
