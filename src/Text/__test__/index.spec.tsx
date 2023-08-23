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

  it('when with type is grey show correctly', () => {
    const { queryByText } = render(<Text>grey text</Text>);
    const element = queryByText('primary text');
    expect(element?.classList.contains('tst-text-grey')).toBeTruthy();
  });

  it('with the ellipsisWidth props show correctly', () => {
    const { queryByText } = render(
      <Text ellipsisWidth={100}>塔斯汀主题色的文本</Text>,
    );
    const element = queryByText('塔斯汀主题色的文本');
    expect(element?.classList.contains('tst-text-ellipsis')).toBeTruthy();
  });

  it('with the bold props show correctly', () => {
    const { queryByText } = render(<Text bold>塔斯汀主题色的文本</Text>);
    const element = queryByText('塔斯汀主题色的文本');
    expect(element?.classList.contains('tst-text-bold')).toBeTruthy();
  });
});
