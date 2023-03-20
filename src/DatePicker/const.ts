import moment from 'moment';
import { DateType } from '.';

export const TYPES: { name: string; type: DateType }[] = [
  {
    name: '日',
    type: 'date',
  },
  {
    name: '周',
    type: 'week',
  },
  {
    name: '月',
    type: 'year-month',
  },
  {
    name: '自定义',
    type: 'custom',
  },
];

export const date = {
  minDate: new Date(2020, 0, 1),
  maxDate: new Date(2025, 10, 1),
  today: new Date(),
  yesterday: new Date(new Date().getTime() - 86400000),
  lastMonthsVal: new Date(moment().subtract(1, 'months').valueOf()),
};

const today = `${moment().format('YYYY-MM-DD')}`;

export const formatYYYYMMDDCN = (val?: any) =>
  moment(val).format('YYYY年MM月DD日');

export const defaultStartTime = (disabledToday?: boolean) => {
  const subtractNum = disabledToday ? 8 : 7;
  return {
    text: moment().subtract(subtractNum, 'day').format('YYYY年MM月DD日'),
    value: moment(today).subtract(subtractNum, 'day'),
  };
};

export const defaultEndTime = (disabledToday?: boolean) => {
  const subtractNum = disabledToday ? 1 : 0;
  return {
    text: moment().subtract(subtractNum, 'day').format('YYYY年MM月DD日'),
    value: moment(today).subtract(subtractNum, 'day'),
  };
};

export const dateInitValue = (type: DateType, disabledToday?: boolean) => {
  const currentDate = disabledToday ? date.yesterday : date.today;

  const currentweekTime = disabledToday
    ? moment().subtract(7, 'days')
    : moment();
  const currentWeekDate = `${currentweekTime.format(
    'YYYY年',
  )}${currentweekTime.format('第wo')}`;
  const currentWeekDates = `（${currentweekTime
    .startOf('week')
    .format('MM-DD')}~${currentweekTime.endOf('week').format('MM-DD')}）`;

  const currentMonth = disabledToday
    ? moment().subtract(1, 'months')
    : moment();
  const currentCuston = disabledToday ? date.yesterday : date.today;

  switch (type) {
    case 'date':
      return formatYYYYMMDDCN(currentDate);
    case 'week':
      return `${currentWeekDate} ${currentWeekDates}`;
    case 'year-month':
      return `${currentMonth.format('YYYY年MM月')}`;
    case 'custom':
      return [
        formatYYYYMMDDCN(currentCuston),
        moment(currentCuston).add(31, 'day').format('YYYY-MM-DD'),
      ];
    default:
      return;
  }
};
