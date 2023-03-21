import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import moment, { Moment } from 'moment';
import * as React from 'react';
import { useMemo } from 'react';
import { DateType } from '..';
import '../index.less';

const dateType2Other = {
  date: {
    preButtonText: '前一天',
    nextButtonText: '后一天',
    momentDateType: 'd',
  },
  week: {
    preButtonText: '前一周',
    nextButtonText: '后一周',
    momentDateType: 'weeks',
  },
  'year-month': {
    preButtonText: '前一月',
    nextButtonText: '后一月',
    momentDateType: 'm',
  },
};

type QuickButtonProps = {
  dates: Moment[];
  dateType: DateType;
  onChange: (value: Moment[]) => void;
  disabledToday: boolean;
};

const limit = (type: DateType, disabledToday?: boolean) => {
  if (type === 'date') {
    return disabledToday
      ? moment().subtract(1, 'd').format('YYYY-MM-DD').valueOf()
      : moment().format('YYYY-MM-DD').valueOf();
  }
  if (type === 'year-month') {
    return disabledToday
      ? moment().subtract(1, 'months').format('YYYY-MM').valueOf()
      : moment().format('YYYY-MM').valueOf();
  }

  if (type === 'week') {
    return disabledToday
      ? moment().subtract(1, 'weeks').format('第wo')
      : moment().format('第wo');
  }

  return moment().valueOf();
};

const QuickButton = ({
  dates,
  dateType,
  onChange,
  disabledToday,
}: QuickButtonProps) => {
  const disabledNextButton = useMemo(() => {
    if (dateType === 'date') {
      if (
        moment(dates[0]).format('YYYY-MM-DD').valueOf() >=
        limit(dateType, disabledToday)
      ) {
        return true;
      }
    }

    if (dateType === 'week') {
      if (moment(dates[0]).format('第wo') === limit(dateType, disabledToday)) {
        return true;
      }
    }

    if (dateType === 'year-month') {
      if (
        moment(dates[0]).format('YYYY-MM') === limit(dateType, disabledToday)
      ) {
        return true;
      }
    }

    return false;
  }, [dates, dateType]);

  const handleClick = (apiType: 'subtract' | 'add') => {
    if (dateType === 'date') {
      const startDate = moment(dates?.[0])[apiType](1, 'days');
      const endDate = moment(dates?.[1])[apiType](1, 'days');

      onChange([startDate, endDate]);
    }

    if (dateType === 'week') {
      const week = moment(dates?.[0])[apiType](1, 'week').startOf('week');
      const endWeek = moment(dates?.[1])[apiType](1, 'week').endOf('week');
      onChange([week, endWeek]);
    }

    if (dateType === 'year-month') {
      const startDate = moment(dates?.[0])
        [apiType](1, 'month')
        .startOf('month');
      const endDate = moment(dates?.[1])[apiType](1, 'month').endOf('month');
      onChange([startDate, endDate]);
    }
  };

  return dateType !== 'custom' ? (
    <div className="tst-flex tst-w-full tst-fixed tst-bottom-10 tst-px-4 tst-z-10">
      <Button
        block
        className="tst-h-10	tst-rounded-3xl tst-mr-3"
        onClick={() => handleClick('subtract')}
      >
        <LeftOutlined />
        {dateType2Other[dateType]?.preButtonText}
      </Button>
      <Button
        block
        className="tst-h-10	tst-rounded-3xl"
        disabled={disabledNextButton}
        onClick={() => handleClick('add')}
      >
        {dateType2Other[dateType]?.nextButtonText}
        <RightOutlined />
      </Button>
    </div>
  ) : null;
};

export default QuickButton;
