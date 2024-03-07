/**
 *
 * @param year 年份
 * @param month 月份
 * @param day 日
 * @returns 时间戳（年月日不传默认返回当天）
 */
export function getTimestamp(
  year: number = new Date().getFullYear(),
  month: number = new Date().getMonth() + 1,
  day: number = new Date().getDate(),
) {
  return new Date(year, month - 1, day).getTime();
}
