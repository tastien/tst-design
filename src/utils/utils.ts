import { message, Upload } from 'antd';

type IResponse<T = any> = {
  code: 200 | 500 | 401 | 600;
  msg?: string;
  result: T;
};

// 右上角导出的位置
let target: { x: number; y: number };

export const showExportAnimation = async (position: {
  x: number;
  y: number;
}) => {
  const targetDom = document.getElementById('export-entery-icon');
  if (!targetDom) return;
  if (!target) {
    if (targetDom.getBoundingClientRect) {
      const { x, y, width } = targetDom.getBoundingClientRect();
      target = { x: Math.round(x + width) - 6, y: y + 6 };
    } else {
      target = {
        x:
          document.body.clientWidth -
          targetDom.parentElement!.parentElement!.parentElement!
            .nextElementSibling!.clientWidth -
          24,
        y: 20,
      };
    }
  }

  // 加入动画的 dom 节点
  const dom = document.createElement('div');
  dom.className = 'exportAnim';

  dom.style.top = `${position.y - 8}px`;
  dom.style.left = `${position.x - 8}px`;
  document.body.appendChild(dom);

  // 绘制动画
  const FRAME_NUMBER = 30;
  const limit = FRAME_NUMBER - 5;
  const unitX = (target.x - position.x) / FRAME_NUMBER;
  const unitY = (target.y - position.y) / FRAME_NUMBER;

  return new Promise<void>((resolve) => {
    let i = 1;
    const action = () =>
      requestAnimationFrame(() => {
        const offsetX = unitX * i * (2 - i / FRAME_NUMBER);
        const offsetY = (unitY * i * i) / FRAME_NUMBER;
        dom.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

        if (i === limit) dom.style.opacity = '0';

        if (i++ === FRAME_NUMBER) {
          document.body.removeChild(dom);
          resolve();
          return;
        }

        action();
      });
    action();
  });
};

export function isSuccResponse(response: IResponse<any>, defaultMsg?: string) {
  if (!response) {
    message.error(defaultMsg);
    return false;
  }
  if (response.code !== 200) {
    message.error(response.msg);
    return false;
  }
  return true;
}

export const dateFormatStr = 'YYYY-MM-DD';

export const checkFile = (file: File, limitSize: number) => {
  const { size } = file;
  if (size / 1000 / 1000 > limitSize) {
    message.error('文件过大请选择其他文件');
    return Upload.LIST_IGNORE;
  }

  return true;
};

/**
 *
 * @param rgb string
 * @returns string
 *
 * 将rgb颜色转为16进制颜色
 */
export function rgbToHex(rgb: string) {
  const r = parseInt(rgb.split('(')[1].split(',')[0]);
  const g = parseInt(rgb.split(',')[1]);
  const b = parseInt(rgb.split(',')[2].split(')')[0]);

  const hexR = r.toString(16).padStart(2, '0')?.toUpperCase();
  const hexG = g.toString(16).padStart(2, '0')?.toUpperCase();
  const hexB = b.toString(16).padStart(2, '0')?.toUpperCase();

  return `#${hexR}${hexG}${hexB}`;
}
