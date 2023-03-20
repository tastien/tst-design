import { Col, Row } from 'antd';
import classNames from 'classnames';
import * as React from 'react';
import { dateInitValue, TYPES } from '../../const';
import { Context, DateType } from '../../index';

import './index.less';

function ColumnsTop({
  type,
  changeValue,
  setType,
  setChangeValue,
  bottom,
}: {
  changeValue: any;
  type: 'date' | 'year-month' | 'week' | 'custom';
  setType: (type: 'date' | 'year-month' | 'week' | 'custom') => void;
  setChangeValue: (date: any) => void;
  bottom?: () => React.ReactNode;
}) {
  const data = React.useContext(Context);

  const types = TYPES.filter((item) => data.pickDateType.includes(item?.type));

  const onClick = (t: { name?: string; type: DateType }) => {
    let date: any;
    date = dateInitValue(t.type, data.disabledToday);
    setChangeValue(date);
    setType(t.type);
  };

  return (
    <div className="tst-date-picker-columns-top">
      <div className="tst-date-picker-columns-top-radio">
        <Row className="tst-date-picker-columns-top-radio-box">
          {types.map((t) => (
            <Col
              onClick={() => onClick(t)}
              key={t.type}
              span={24 / types.length}
              className={classNames(
                'tst-date-picker-columns-top-radio-box-item',
                t.type === type
                  ? 'tst-date-picker-columns-top-radio-box-item-active'
                  : '',
              )}
            >
              {t.name}
            </Col>
          ))}
        </Row>
      </div>
      {bottom ? (
        bottom()
      ) : (
        <div className="tst-date-picker-columns-top-time">{changeValue}</div>
      )}
    </div>
  );
}

export default ColumnsTop;
