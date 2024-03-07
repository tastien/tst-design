import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import StartEndDate from '..';

describe('StartEndDate components', () => {
  it('render', () => {
    const components = render(
      <StartEndDate date={[new Date().getTime(), new Date().getTime()]} />,
    );

    expect(components).toBeDefined();
  });

  it('render today', () => {
    const components = render(
      <StartEndDate date={[new Date().getTime(), new Date().getTime()]} />,
    );

    const startDateElement = components.getByText(/起：2024-03-08/);
    const endDateElement = components.getByText(/止：2024-03-08/);

    expect(startDateElement).toBeInTheDocument();
    expect(endDateElement).toBeInTheDocument();
  });

  it('render timePeriod', () => {
    const comments = render(
      <StartEndDate
        date={[
          new Date('2024-03-06').getTime(),
          new Date('2024-03-10').getTime(),
        ]}
      />,
    );

    const startDateElement = comments.getByText(/起：2024-03-06/);
    const endDateElement = comments.getByText(/止：2024-03-10/);

    expect(startDateElement).toBeInTheDocument();
    expect(endDateElement).toBeInTheDocument();
  });

  it('render timePeriod format', () => {
    const format = 'YYYY年MM月DD日';

    const comments = render(
      <StartEndDate
        date={[
          new Date('2024-03-06').getTime(),
          new Date('2024-03-10').getTime(),
        ]}
        format={format}
      />,
    );

    const startDateElement = comments.getByText(/起：2024年03月06日/);
    const endDateElement = comments.getByText(/止：2024年03月10日/);

    expect(startDateElement).toBeInTheDocument();
    expect(endDateElement).toBeInTheDocument();
  });
});
