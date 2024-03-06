import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Form } from 'antd';
import { create } from 'match-media-mock';
import React from 'react';
import AvailableTime from '..';

describe('AvailableTime', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    const matchMedia = create();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMedia,
    });
  });

  it('should be possible to modify the name of the new time period button', async () => {
    const addButtonName = '添加用餐时间';
    const { container } = render(
      <Form>
        <AvailableTime addButtonName={addButtonName} />
      </Form>,
    );
    const radios = container.querySelectorAll('input');
    fireEvent.click(radios[1]);

    await act(() => Promise.resolve());

    const addButton = screen.getByRole('button', {
      name: `plus ${addButtonName}（最多允许3个）`,
    });
    expect(addButton).toBeInTheDocument();
  });

  it('should be possible to set the maxCount of time periods', async () => {
    const maxCount = 5;
    const { container } = render(
      <Form>
        <AvailableTime maxCount={5} />
      </Form>,
    );
    const radios = container.querySelectorAll('input');
    fireEvent.click(radios[1]);

    await act(() => Promise.resolve());

    const addButton = screen.getByRole('button', {
      name: `plus 新增时段（最多允许${maxCount}个）`,
    });
    expect(addButton).toBeInTheDocument();

    // 点击 maxCount 次新增时段按钮
    for (let i = 0; i < maxCount; i++) {
      fireEvent.click(addButton);
    }

    await act(() => Promise.resolve());

    const clockCircle = screen.getAllByRole('img', { name: 'clock-circle' });
    expect(clockCircle).toHaveLength(maxCount);
  });

  it('should obtained correctly disabled status', () => {
    const { container } = render(
      <Form>
        <AvailableTime disabled />
      </Form>,
    );
    const radioButtons = container.querySelectorAll('.ant-radio-input');

    expect(radioButtons[0]).toHaveAttribute('disabled');
    expect(radioButtons[1]).toHaveAttribute('disabled');
  });

  it('should support the next day', async () => {
    const { container } = render(
      <Form>
        <AvailableTime supportNextDay />
      </Form>,
    );
    const radios = container.querySelectorAll('input');
    fireEvent.click(radios[1]);
    await act(() => Promise.resolve());
    const addButton = screen.getByRole('button', {
      name: `plus 新增时段（最多允许3个）`,
    });
    fireEvent.click(addButton);
    await act(() => Promise.resolve());
    const antPicker = container.querySelectorAll('.ant-picker');
    expect(antPicker).toHaveLength(2);
  });

  it('should support radio change to vertical direction', async () => {
    const { container } = render(
      <Form>
        <AvailableTime radioDirection="vertical" />
      </Form>,
    );

    const antSpaceVertical = container.querySelector('.ant-space-vertical');
    expect(antSpaceVertical).toBeInTheDocument();
  });

  it('should support radio change props', async () => {
    render(
      <Form>
        <AvailableTime
          radioGroupProps={{
            options: [
              {
                label: '与门店营业时间保持一致',
                value: true,
              },
              {
                label: '单独设置外卖营业时间',
                value: false,
              },
            ],
          }}
        />
      </Form>,
    );

    const inputRadio1 = screen.getByLabelText('与门店营业时间保持一致');
    expect(inputRadio1).toBeInTheDocument();

    const inputRadio2 = screen.getByLabelText('单独设置外卖营业时间');
    expect(inputRadio2).toBeInTheDocument();
  });

  it('should support form item change props', async () => {
    const { container } = render(
      <Form>
        <AvailableTime
          formItemProps={{
            fullTime: {
              name: 'fullTime',
              label: '售卖时间',
            },
            weeks: {
              name: 'saleWeeks',
              wrapperCol: { offset: 8 },
            },
            times: {
              name: 'saleTimes',
              required: true,
              wrapperCol: { offset: 8 },
              rules: [{ required: true, message: '请选择售卖时段' }],
            },
          }}
        />
      </Form>,
    );
    const radios = container.querySelectorAll('input');
    fireEvent.click(radios[1]);
    await act(() => Promise.resolve());

    const fullTimeLabel = screen.getByText('售卖时间');
    expect(fullTimeLabel).toBeInTheDocument();
  });
});
