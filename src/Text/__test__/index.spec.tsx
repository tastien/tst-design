import { render } from '@testing-library/react';
import Text from '..';
import React = require('react');

describe('>>> component Text', () => {
  it('can success render text', () => {
    const { queryByText } = render(<Text>hello jest</Text>);
    expect(queryByText('hello jest')).toBeTruthy();
  });

  it('when without provide type props', () => {
    const { queryByText } = render(<Text>without type</Text>);
    const element = queryByText('without type');
    expect(element?.classList.contains('tst-primary-color')).toBeTruthy();
  });

  it('when without type is primary', () => {
    const { queryByText } = render(<Text>primary text</Text>);
    const element = queryByText('primary text');
    expect(element?.classList.contains('tst-primary-color')).toBeTruthy();
  });

  it('when type is grey', () => {
    const { queryByText } = render(<Text type="grey">grey</Text>);
    const element = queryByText('grey');
    expect(element?.classList.contains('tst-primary-color')).toBeFalsy();
  });
});
