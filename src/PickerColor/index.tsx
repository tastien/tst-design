import Colorpicker, {
  AnyColorFormat as antAnyColorFormat,
  ColorPickerResult as antColorPickerResult,
  ColorPickerValue as antColorPickerValue,
} from './Colorpicker';

export type AnyColorFormat = antAnyColorFormat;
export type ColorPickerResult = antColorPickerResult;
export type ColorPickerValue = antColorPickerValue;

const PickerColor = Colorpicker;
export default PickerColor;
