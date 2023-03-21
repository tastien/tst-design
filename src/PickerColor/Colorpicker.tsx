import { Popover } from 'antd';
import PropTypes from 'prop-types';
import React, { CSSProperties } from 'react';
import * as ReactColor from 'react-color';
import { Color, ColorResult } from 'react-color';
import tinycolor from 'tinycolor2';

const getPicker = (pickerType: Props['picker']) => {
  switch (pickerType) {
    case 'BlockPicker':
      return ReactColor.BlockPicker;
    case 'ChromePicker':
      return ReactColor.ChromePicker;
    case 'CirclePicker':
      return ReactColor.CirclePicker;
    case 'CompactPicker':
      return ReactColor.CompactPicker;
    case 'GithubPicker':
      return ReactColor.GithubPicker;
    case 'HuePicker':
      return ReactColor.HuePicker;
    case 'MaterialPicker':
      return ReactColor.MaterialPicker;
    case 'PhotoshopPicker':
      return ReactColor.PhotoshopPicker;
    case 'SliderPicker':
      return ReactColor.SliderPicker;
    case 'SwatchesPicker':
      return ReactColor.SwatchesPicker;
    case 'TwitterPicker':
      return ReactColor.TwitterPicker;
  }
  return ReactColor.SketchPicker;
};
interface HSVColor {
  a?: number | undefined;
  h: number;
  s: number;
  v: number;
}

export type ColorPickerTypes =
  | 'BlockPicker'
  | 'ChromePicker'
  | 'CirclePicker'
  | 'CompactPicker'
  | 'GithubPicker'
  | 'GooglePicker'
  | 'HuePicker'
  | 'MaterialPicker'
  | 'PhotoshopPicker'
  | 'SketchPicker'
  | 'SliderPicker'
  | 'SwatchesPicker'
  | 'TwitterPicker';

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
  picker?: ColorPickerTypes;
  // popoverProps?: any
  [key: string]: any;
};

type FC<P> = ((props: P) => JSX.Element) & {
  propTypes: { [key: string]: any };
};

const Colorpicker: FC<Props> = ({
  value,
  onChange,
  onChangeComplete,
  onColorResult,
  popup = true,
  blockStyles = {
    width: '100px',
  },
  // popoverProps = {},
  picker = 'ChromePicker',
  ...props
}) => {
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

  const fixReactColorStyles: { [key in ColorPickerTypes]?: any } = {
    MaterialPicker: {
      default: {
        material: {
          boxSizing: 'content-box',
        },
      },
    },
  };

  if (popup) {
    fixReactColorStyles['SliderPicker'] = {
      default: {
        hue: {
          minWidth: '300px',
        },
      },
    };
  }

  const Picker = getPicker(picker);

  return (
    <>
      {popup ? (
        <Popover
          trigger="click"
          // {...popoverProps}
          content={
            <Picker
              color={prepareValue(value)}
              onChange={triggerOnChange}
              onChangeComplete={triggerOnChangeComplete}
              styles={fixReactColorStyles[picker] || undefined}
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
          styles={fixReactColorStyles[picker] || undefined}
          {...props}
        />
      )}
    </>
  );
};

Colorpicker.propTypes = {
  popup: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  onChangeComplete: PropTypes.func,
  onColorResult: PropTypes.func,
  blockStyles: PropTypes.object,
  // popoverProps: PropTypes.object,
  picker: PropTypes.oneOf([
    'BlockPicker',
    'ChromePicker',
    'CirclePicker',
    'CompactPicker',
    'GithubPicker',
    'GooglePicker',
    'HuePicker',
    'MaterialPicker',
    'PhotoshopPicker',
    'SketchPicker',
    'SliderPicker',
    'SwatchesPicker',
    'TwitterPicker',
  ]),
};

export default Colorpicker;
