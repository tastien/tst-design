import { CalendarOutlined } from '@ant-design/icons';
import * as React from 'react';
import { Field, Popup } from 'react-vant';
import { PickerCustom, PickerDate, PickerWeek } from './components';
import BusinessDaySwitch from './components/BusinessDaySwitch';
import { date, dateInitValue } from './const';

import { Moment } from 'moment';
import PickerMonth from './components/PickerMonth';
import QuickButton from './components/QuickButton';
import './index.less';

export type DateType = 'date' | 'year-month' | 'week' | 'custom';

export type DatePickerIndexProps = {
  onChange: (params: any) => void;
  onType?: (type: DateType) => void;
  businessDaySwitch?: boolean;
  rightIcon?: React.ReactNode;
  style?: React.CSSProperties;
  searchBusinessDay?: boolean;
  pickDateType?: DateType[];
  subTitle?: string;
  disabledToday?: boolean;
  quickSwitchButton?: {
    dates: Moment[];
  };
};

export interface PickerDateSwitchProps {
  onCancel: () => void;
  onConfirm: (file: any, parma: any) => void;
  setType: (t: any) => void;
  subTitle?: string;
  disabledToday?: boolean;
  changeValue: string;
  setChangeValue: React.Dispatch<React.SetStateAction<string>>;
  value?: any;
  setValue?: React.Dispatch<React.SetStateAction<any>>;
}

type CompoundedComponent = DatePickerIndexProps & {
  QuickButton?: typeof QuickButton;
};

export const Context = React.createContext<{
  pickDateType: DateType[];
  disabledToday: boolean;
}>({
  pickDateType: [],
  disabledToday: false,
});

const ContextProvider = Context.Provider;

const DatePickerIndex = ({
  onChange,
  onType,
  businessDaySwitch,
  rightIcon = <CalendarOutlined className="tst-date-picker-right-icon" />,
  style,
  searchBusinessDay,
  pickDateType = ['date', 'week', 'year-month', 'custom'],
  subTitle,
  disabledToday = false,
  quickSwitchButton,
}: CompoundedComponent) => {
  const [dateType, setDateType] = React.useState<DateType>('date');
  const defaultDateValue = disabledToday ? date.yesterday : date.today;
  const defaultMonthValue = disabledToday ? date.lastMonthsVal : date.today;
  const [showPicker, setShowPicker] = React.useState(false);
  const limitDate = dateInitValue(dateType, disabledToday);
  const [changeValue, setChangeValue] = React.useState(limitDate as string);
  const [fieldValue, setFieldValue] = React.useState(limitDate as string);
  const [dateValue, setDateValue] = React.useState<any>(defaultDateValue);
  const [weekValue, setWeekValue] = React.useState<any>();
  const [monthValue, setMonthValue] = React.useState<any>(defaultMonthValue);
  const [quickButtonTextType, setQuickButtonTextType] =
    React.useState<DateType>('date');

  const onConfirm = (fieldValue: React.SetStateAction<string>, parma: any) => {
    setFieldValue(fieldValue);
    onChange(parma);
    setShowPicker(false);
    setQuickButtonTextType(dateType);
  };

  const onCancel = () => setShowPicker(false);

  const setTypeDateSwitch = (t: any) => {
    setDateType(t);
    onType?.(t);
  };

  const DateSwitch = (
    props: Omit<PickerDateSwitchProps, 'value' | 'setValue'>,
  ) => {
    switch (dateType) {
      case 'date':
        return (
          <PickerDate {...props} value={dateValue} setValue={setDateValue} />
        );
      case 'week':
        return (
          <PickerWeek {...props} value={weekValue} setValue={setWeekValue} />
        );
      case 'year-month':
        return (
          <PickerMonth {...props} value={monthValue} setValue={setMonthValue} />
        );
      case 'custom':
        return <PickerCustom {...props} />;
      default:
        return null;
    }
  };

  const onChangeQuickButton = (value: Moment) => {
    if (dateType === 'date') {
      setFieldValue(value.format('YYYY年MM月DD日'));
      setChangeValue(value.format('YYYY年MM月DD日'));
      setDateValue(new Date(value.valueOf()));
    }
    if (dateType === 'week') {
      const year = value.format('YYYY年');
      const week = value.format('第wo');
      const date = `${value.clone().startOf('week').format('MM-DD')}~${value
        .clone()
        .endOf('week')
        .format('MM-DD')}`;

      setFieldValue(`${year}${week}`);
      setChangeValue(`${year}${week}（${date}）`);
      setWeekValue([
        {
          text: year,
          value: value.format('YYYY'),
        },
        {
          text: week,
          value: date,
        },
      ]);
    }
    if (dateType === 'year-month') {
      setFieldValue(value.format('YYYY年MM月'));
      setChangeValue(value.format('YYYY年MM月'));
      setMonthValue(new Date(value.valueOf()));
    }
  };

  return (
    <>
      <ContextProvider value={{ pickDateType, disabledToday }}>
        <div style={style} className="tst-date-picker-field-box">
          {businessDaySwitch && (
            <BusinessDaySwitch
              searchBusinessDay={searchBusinessDay}
              onChange={onChange}
            />
          )}
          <Field
            readOnly
            clickable
            value={fieldValue}
            placeholder="选择选择日期"
            rightIcon={rightIcon}
            onClick={() => setShowPicker(true)}
          />
        </div>
        <Popup
          closeable={false}
          visible={showPicker}
          round={false}
          position="bottom"
          onClose={() => setShowPicker(false)}
        >
          {DateSwitch({
            onCancel,
            onConfirm,
            setType: setTypeDateSwitch,
            disabledToday,
            subTitle,
            setChangeValue,
            changeValue,
          })}
        </Popup>
      </ContextProvider>
      {!!quickSwitchButton && dateType !== 'custom' && (
        <QuickButton
          dates={quickSwitchButton?.dates}
          onChange={(value) => {
            onChange({
              dates: value,
            });
            onChangeQuickButton(value?.[0]);
          }}
          dateType={quickButtonTextType}
          disabledToday={disabledToday}
        />
      )}
    </>
  );
};

DatePickerIndex.QuickButton = QuickButton;

export default DatePickerIndex;
