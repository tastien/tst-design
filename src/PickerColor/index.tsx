import Colorpicker, {
  AnyColorFormat as antAnyColorFormat,
  ColorPickerResult as antColorPickerResult,
  ColorPickerTypes as antColorPickerTypes,
  ColorPickerValue as antColorPickerValue,
} from './Colorpicker';

export type AnyColorFormat = antAnyColorFormat;
export type ColorPickerResult = antColorPickerResult;
export type ColorPickerTypes = antColorPickerTypes;
export type ColorPickerValue = antColorPickerValue;

const PickerColor = Colorpicker;
export default PickerColor;
