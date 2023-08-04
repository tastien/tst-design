import { Popover } from 'antd';
import React from 'react';
import * as ReactColor from 'react-color';
import { Color, ColorResult } from 'react-color';
import tinycolor from 'tinycolor2';

interface HSVColor {
  a?: number | undefined;
  h: number;
  s: number;
  v: number;
}

export type ColorPickerValue = Color | HSVColor;
export type ColorPickerResult = ColorResult;
export type AnyColorFormat = ColorPickerResult | ColorPickerValue;

type Props = {
  popup?: boolean;
  value?: AnyColorFormat;
  onChange?: (value: any) => void;
  onChangeComplete?: (value: any) => void;
  onColorResult?: (color: ColorPickerResult) => AnyColorFormat;
  [key: string]: any;
};

const Colorpicker = ({
  value,
  onChange,
  onChangeComplete,
  onColorResult,
  popup = true,
  ...props
}: Props) => {
  const formatColor = (color?: AnyColorFormat) => {
    return color !== undefined && typeof color !== 'string'
      ? tinycolor(
          'hsl' in color
            ? color['hsl']
            : 'hsv' in color
            ? color['hsv']
            : 'rgb' in color
            ? color['rgb']
            : 'hex' in color
            ? color['hex']
            : color,
        )
      : tinycolor(color);
  };

  const prepareValue = (value: AnyColorFormat | undefined) => {
    const decimalToHex = (alpha: number) =>
      alpha === 0 ? '00' : Math.round(255 * alpha).toString(16);
    const formatted = formatColor(value);
    return `${formatted.toHexString()}${decimalToHex(formatted.getAlpha())}`;
  };

  const triggerOnChange = (color: ColorPickerResult) => {
    const colorValue = onColorResult ? onColorResult(color) : color;
    onChange?.(colorValue);
  };

  const triggerOnChangeComplete = (color: ColorPickerResult) => {
    const colorValue = onColorResult ? onColorResult(color) : color;
    onChangeComplete?.(colorValue);
  };

  const getBackgroundBlockColor = (color?: AnyColorFormat) => {
    const formatted = formatColor(color);
    const rgba = formatted.toRgb();
    return color
      ? `rgba(
        ${rgba?.r ?? 0}, ${rgba?.g ?? 0}, ${rgba?.b ?? 0}, ${rgba?.a ?? 100}
      )`
      : '';
  };

  const blStyles = Object.assign(
    {},
    {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #d9d9d9',
      padding: '1px',
      width: '32px',
      height: '32px',
      borderRadius: '6px',
      cursor: 'pointer',
    },
  );

  const blInnerStyles = Object.assign(
    {},
    {
      width: '24px',
      height: '24px',
      border: '1px solid #d9d9d9',
      borderRadius: '4px',
    },
    { background: getBackgroundBlockColor(value) },
  );

  const Picker = ReactColor.ChromePicker;

  return (
    <>
      {popup ? (
        <Popover
          trigger="click"
          content={
            <Picker
              color={prepareValue(value)}
              onChange={triggerOnChange}
              onChangeComplete={triggerOnChangeComplete}
              {...props}
            />
          }
        >
          <div style={blStyles}>
            <div style={blInnerStyles} />
          </div>
        </Popover>
      ) : (
        <Picker
          color={prepareValue(value)}
          onChange={triggerOnChange}
          onChangeComplete={triggerOnChangeComplete}
          {...props}
        />
      )}
    </>
  );
};

export default Colorpicker;
