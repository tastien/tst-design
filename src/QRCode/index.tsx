import { uniqueId } from 'lodash';
import React, { FC, HTMLAttributes, useEffect, useRef } from 'react';
// @ts-ignore
import QRCodeJS from './qrcode.js';

interface TProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 扫描后的文本
   */
  value: string;
  /**
   * 二维码大小 默认160
   */
  size?: number;
  /**
   * 二维码纠错等级 0 1 2 3 默认 1
   */
  errorLevel?: QRCodeJS.CorrectLevelType;
  /**
   * 二维码前景色 默认 #000
   */
  colorDark?: string;
  /**
   * 二维码背景色 默认 #FFF
   */
  colorLight?: string;
  /**
   * 二维码中间icon 地址 暂只支持url
   */
  icon?: string;
  /**
   * 二维码中图片的大小
   */
  iconSize?: number;
}

const QRCode: FC<TProps> = (props) => {
  const {
    value,
    size = 160,
    errorLevel = 1,
    colorDark = '#000000',
    colorLight = '#FFFFFF',
    icon,
    iconSize = 40,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const id = uniqueId();
  useEffect(() => {
    /* eslint-disable-next-line no-new */
    new QRCodeJS(id, {
      text: value,
      width: size,
      height: size,
      colorDark,
      colorLight,
      correctLevel: errorLevel,
    });
    return () => {
      if (ref.current) {
        ref.current.innerHTML = '';
      }
    };
  }, [props]);

  return (
    <div
      data-testid="qrcode_component"
      style={{
        width: size,
        height: size,
        position: 'relative',
      }}
    >
      <div id={id} ref={ref}></div>
      {icon && (
        <img
          data-testid="qrcode_icon"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
          }}
          width={iconSize}
          height={iconSize}
          src={icon}
          alt=""
        />
      )}
    </div>
  );
};

export default QRCode;
