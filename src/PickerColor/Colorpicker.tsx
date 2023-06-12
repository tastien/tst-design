import { Popover } from 'antd';
import React, { CSSProperties } from 'react';
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
  blockStyles?: CSSProperties;
  [key: string]: any;
};

const Colorpicker = ({
  value,
  onChange,
  onChangeComplete,
  onColorResult,
  popup = true,
  blockStyles = {
    width: '100px',
  },
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
      width: '50px',
      height: '20px',
      display: 'inline-flex',
      border: '2px solid #fff',
      boxShadow: '0 0 0 1px #ccc',
    },
    blockStyles,
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
          <div style={blStyles} />
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
