import { render } from '@testing-library/react';
import QRCode from '..';
import React = require('react');

describe('>>> component QRCode', () => {
  it('it can render img tag when we provide icon attribute', () => {
    const { getByTestId } = render(
      <QRCode
        value="hello tstd"
        icon="https://image.jimmyxuexue.top/img/202308171112069.png"
      />,
    );

    const qrcode = getByTestId('qrcode_component');
    const qrcode_icon = getByTestId('qrcode_icon');
    const computedStyle = window.getComputedStyle(qrcode);

    expect(computedStyle.width).toBe('160px');
    expect(qrcode_icon).toBeTruthy();
  });

  it("it can't render img tag when we dose not provide icon attribute", () => {
    const { getByTestId } = render(<QRCode value="hello tstd" size={100} />);

    const qrcode = getByTestId('qrcode_component');
    const computedStyle = window.getComputedStyle(qrcode);
    expect(computedStyle.width).toBe('100px');
    const img = qrcode.querySelector('img');
    expect(img).toBeFalsy();
  });
});
