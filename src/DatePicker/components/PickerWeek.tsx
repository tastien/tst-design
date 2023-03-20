import moment from 'moment';
import * as React from 'react';
import { PickerDateSwitchProps } from '..';
import ColumnsTop from './ColumnsTop/index';
import DialogAlert from './DialogAlert';
import Title from './Title';
import WeekPicker from './WeekPicker';

const PickerWeek = ({
  onConfirm,
  onCancel,
  setType,
  subTitle,
  disabledToday,
  setChangeValue,
  changeValue,
  setValue,
  value,
}: PickerDateSwitchProps) => {
  const onChangeWeekPicker = (val: [any, any]) => {
    const [year, week] = val;
    const value = `${year?.text}${week?.text} （${week?.value}）`;
    setChangeValue(value);
    if (setValue) setValue(val);
  };

  const onConfirmWeekPicker = (value: { text: string; dates: string[] }) => {
    const limit = moment().valueOf();
    const date = disabledToday ? value.dates[1] : value.dates[0];
    const parma = {
      dates: [moment(value.dates[0]), moment(value.dates[1])],
    };

    if (moment(date).valueOf() >= limit) {
      DialogAlert('选择时间不能大于当前时间');
      return;
    }

    onConfirm(value.text, parma);
  };

  return (
    <WeekPicker
      title={<Title subTitle={subTitle} />}
      onCancel={onCancel}
      value={value}
      onChange={onChangeWeekPicker}
      disabledToday={disabledToday}
      columnsTop={
        <ColumnsTop
          changeValue={changeValue}
          type="week"
          setType={setType}
          setChangeValue={setChangeValue}
        />
      }
      onConfirm={onConfirmWeekPicker}
      onDefaultChange={setChangeValue}
    />
  );
};

export default PickerWeek;
