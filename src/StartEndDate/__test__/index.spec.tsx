import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import moment from 'moment';
import React from 'react';
import StartEndDate from '..';
import { getTimestamp } from './utils';

describe('getTimestamp', () => {
  test('getTimestamp today', () => {
    const today = moment().startOf('day');
    expect(getTimestamp()).toBe(today.valueOf());
  });

  test('getTimestamp designate', () => {
    const today = moment().add(1, 'days').startOf('day');
    expect(getTimestamp(2024, 3, 7)).toBe(today.valueOf());
  });
});

describe('StartEndDate', () => {
  test('render', () => {
    const comments = render(
      <StartEndDate date={[getTimestamp(), getTimestamp()]} />,
    );

    expect(comments).toBeDefined();
  });

  test('render today', () => {
    const comments = render(
      <StartEndDate date={[getTimestamp(), getTimestamp()]} />,
    );

    const startDateElement = comments.getByText(/起：2024-03-07/);
    const endDateElement = comments.getByText(/止：2024-03-07/);

    expect(startDateElement).toBeInTheDocument();
    expect(endDateElement).toBeInTheDocument();
  });

  test('render timePeriod', () => {
    const comments = render(
      <StartEndDate
        date={[getTimestamp(2024, 3, 6), getTimestamp(2024, 3, 10)]}
      />,
    );

    const startDateElement = comments.getByText(/起：2024-03-06/);
    const endDateElement = comments.getByText(/止：2024-03-10/);

    expect(startDateElement).toBeInTheDocument();
    expect(endDateElement).toBeInTheDocument();
  });

  test('render timePeriod format', () => {
    const format = 'YYYY年MM月DD日';

    const comments = render(
      <StartEndDate
        date={[getTimestamp(2024, 3, 6), getTimestamp(2024, 3, 10)]}
        format={format}
      />,
    );

    const startDateElement = comments.getByText(/起：2024年03月06日/);
    const endDateElement = comments.getByText(/止：2024年03月10日/);

    expect(startDateElement).toBeInTheDocument();
    expect(endDateElement).toBeInTheDocument();
  });
});
