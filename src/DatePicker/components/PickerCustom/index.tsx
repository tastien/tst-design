import classNames from 'classnames';
import moment, { Moment } from 'moment';
import * as React from 'react';
import { useState } from 'react';
import { DatetimePicker } from 'react-vant';
import {
  date,
  defaultEndTime,
  defaultStartTime,
  formatYYYYMMDDCN,
} from '../../const';
import { PickerDateSwitchProps } from '../../index';
import ColumnsTop from '../ColumnsTop/index';
import DialogAlert from '../DialogAlert';
import Title from '../Title';
import './index.less';

type Time = { text: string; value: Moment };

interface StartAndEndTimeProps {
  onClick: () => void;
  active: boolean;
  text?: string;
}

const getDateValueOf = (date: moment.Moment) => {
  return new Date(`${date.format('YYYY-MM-DD')}`).valueOf();
};

const StartAndEndTime = ({ onClick, active, text }: StartAndEndTimeProps) => {
  const cls = active ? 'tst-date-picker-custom-time-active' : '';
  return (
    <div
      onClick={onClick}
      className={classNames('tst-date-picker-custom-time', cls)}
    >
      {text}
    </div>
  );
};

const CustomDate = ({
  onConfirm,
  onCancel,
  setType,
  disabledToday,
  changeValue,
  setChangeValue,
}: PickerDateSwitchProps) => {
  const [isStartOrEnd, setIsStartOrEnd] = useState<'start' | 'end'>('start');

  const [startTime, setStartTime] = useState<Time>(
    defaultStartTime(disabledToday),
  );
  const [endTime, setEndTime] = useState<Time>(defaultEndTime(disabledToday));

  const value =
    isStartOrEnd === 'start'
      ? startTime.value.toDate()
      : isStartOrEnd === 'end'
      ? endTime.value.toDate()
      : startTime.value.toDate();

  const onChangeDatetimePicker = (val: any) => {
    const dateValue = {
      text: formatYYYYMMDDCN(val),
      value: moment(val),
    };
    if (isStartOrEnd === 'start') {
      setStartTime(dateValue);
    }
    if (isStartOrEnd === 'end') {
      setEndTime(dateValue);
    }
  };

  const onConfirmDatetimePicker = () => {
    const currentNow = disabledToday ? moment().subtract(1, 'day') : moment();
    const startTimeValue = startTime.value;
    const endTimeValue = endTime.value;
    const limit31Day = getDateValueOf(moment(startTimeValue).add(31, 'day'));
    const nowValueOf = getDateValueOf(currentNow);
    const endValueOf = getDateValueOf(endTime.value);
    const startValueOf = getDateValueOf(startTimeValue);
    if (endValueOf > nowValueOf) {
      DialogAlert('结束时间不能大于当前时间');
      return;
    }
    if (endValueOf < startValueOf) {
      DialogAlert('结束时间不能小于开始时间');
      return;
    }
    if (endValueOf >= limit31Day) {
      DialogAlert('已超过31天，请重新选择');
      return;
    }

    const parma = {
      dates: [startTimeValue, endTimeValue],
    };
    onConfirm(`${startTime.text} ~ ${endTime.text}`, parma);
  };

  return (
    <DatetimePicker
      title={<Title subTitle="时段相差不超过31天" />}
      type="date"
      minDate={date.minDate}
      maxDate={date.maxDate}
      value={value}
      onChange={onChangeDatetimePicker}
      onCancel={onCancel}
      onConfirm={onConfirmDatetimePicker}
      columnsTop={
        <ColumnsTop
          type="custom"
          changeValue={changeValue}
          setType={setType}
          setChangeValue={setChangeValue}
          bottom={() => (
            <div className="tst-date-picker-custom">
              <StartAndEndTime
                onClick={() => {
                  setIsStartOrEnd?.('start');
                }}
                active={isStartOrEnd === 'start'}
                text={startTime?.text}
              />
              <span>~</span>
              <StartAndEndTime
                onClick={() => {
                  setIsStartOrEnd?.('end');
                }}
                active={isStartOrEnd === 'end'}
                text={endTime?.text}
              />
            </div>
          )}
        />
      }
    />
  );
};

export default CustomDate;
