import moment, { Moment } from 'moment';
import * as React from 'react';
import { dateFormatStr } from '../utils/utils';

interface StartAndEndDateProps {
  date: (string | number | Moment)[];
  format?: string;
}

const StartAndEndDate = ({ date, format }: StartAndEndDateProps) => {
  const [startDate, endDate] = date;
  return (
    <>
      <div>起：{moment(+startDate).format(format ?? dateFormatStr)}</div>
      <div>止：{moment(+endDate).format(format ?? dateFormatStr)}</div>
    </>
  );
};

export default StartAndEndDate;
