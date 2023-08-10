import { render } from '@testing-library/react';
import StatusDot from '..';
import { rgbToHex } from '../../utils/utils';
import React = require('react');
describe('>>> component StatusDotProps', () => {
  it('when status is error', () => {
    const { queryByText, getByTestId } = render(
      <StatusDot type="error" text="失败" />,
    );
    expect(queryByText('失败')).toBeTruthy();
    const element = getByTestId('status_dot');
    const computedStyle = window.getComputedStyle(element);

    expect(rgbToHex(computedStyle.backgroundColor)).toBe('#CC3333');
  });

  it('when status is info', () => {
    const { queryByText, getByTestId } = render(
      <StatusDot type="info" text="消息" />,
    );
    expect(queryByText('消息')).toBeTruthy();
    const element = getByTestId('status_dot');
    const computedStyle = window.getComputedStyle(element);

    expect(rgbToHex(computedStyle.backgroundColor)).toBe('#0066CC');
  });

  it('when status is cancel', () => {
    const { queryByText, getByTestId } = render(
      <StatusDot type="cancel" text="取消" />,
    );
    expect(queryByText('取消')).toBeTruthy();
    const element = getByTestId('status_dot');
    const computedStyle = window.getComputedStyle(element);

    expect(rgbToHex(computedStyle.backgroundColor)).toBe('#BDBEBD');
  });

  it('when status is success', () => {
    const { queryByText, getByTestId } = render(
      <StatusDot type="success" text="成功" />,
    );
    expect(queryByText('成功')).toBeTruthy();
    const element = getByTestId('status_dot');
    const computedStyle = window.getComputedStyle(element);

    expect(rgbToHex(computedStyle.backgroundColor)).toBe('#00CC00');
  });

  it('when status is warning', () => {
    const { queryByText, getByTestId } = render(
      <StatusDot type="warning" text="警告" />,
    );
    expect(queryByText('警告')).toBeTruthy();
    const element = getByTestId('status_dot');
    const computedStyle = window.getComputedStyle(element);

    expect(computedStyle.backgroundColor).toBe('orange');
  });
});
