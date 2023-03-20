import moment from 'moment';
import * as React from 'react';
import { DatetimePicker } from 'react-vant';
import { PickerDateSwitchProps } from '..';
import { date } from '../const';
import ColumnsTop from './ColumnsTop/index';
import DialogAlert from './DialogAlert';
import Title from './Title';

const dateFomat = (val: moment.MomentInput) => {
  return moment(val).format('YYYY年MM月');
};

const PickerDate = ({
  onConfirm,
  onCancel,
  setType,
  subTitle,
  disabledToday,
  setChangeValue,
  changeValue,
  value,
  setValue,
}: PickerDateSwitchProps) => {
  const onConfirmDatetimePicker = (val: any) => {
    const limit = disabledToday
      ? moment().subtract(1, 'months').valueOf()
      : moment().valueOf();

    if (moment(val).valueOf() > limit) {
      DialogAlert('选择时间不能大于当前时间');
      return;
    }
    const startDate = moment(val).startOf('month');
    const endDate = moment(val).endOf('month');
    const parma = {
      dates: [startDate, endDate],
    };

    onConfirm(dateFomat(val), parma);
  };
  return (
    <DatetimePicker
      type="year-month"
      minDate={date.minDate}
      maxDate={date.maxDate}
      value={value}
      title={<Title subTitle={subTitle} />}
      onChange={(val: any) => {
        setChangeValue(dateFomat(val));
        if (setValue) setValue(val);
      }}
      onCancel={onCancel}
      onConfirm={onConfirmDatetimePicker}
      columnsTop={
        <ColumnsTop
          type="year-month"
          changeValue={changeValue}
          setType={setType}
          setChangeValue={setChangeValue}
        />
      }
    />
  );
};

export default PickerDate;
