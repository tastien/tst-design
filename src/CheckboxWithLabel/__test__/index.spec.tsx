import { fireEvent, render } from '@testing-library/react';
import { CheckboxWithLabel } from '..';
import React = require('react');

describe('>>> component CheckboxWithLabel', () => {
  it('CheckboxWithLabel changes the text after click', () => {
    const { queryByLabelText, getByLabelText } = render(
      <CheckboxWithLabel labelOn="开启" labelOff="关闭" />,
    );

    expect(queryByLabelText('关闭')).toBeTruthy();

    fireEvent.click(getByLabelText('关闭'));

    expect(queryByLabelText('关闭')).toBeFalsy();

    expect(queryByLabelText('开启')).toBeTruthy();
  });
});
