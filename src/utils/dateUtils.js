// src/utils/dateUtils.js
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

/**
 * Định dạng khoảng thời gian theo định dạng "7 July 10:00PM - 14 July 8:00PM"
 * @param {string} startDate - Ngày bắt đầu (ISO 8601 string)
 * @param {string} endDate - Ngày kết thúc (ISO 8601 string)
 * @returns {string} - Chuỗi khoảng thời gian đã được định dạng
 */
export const formatDateRange = (startDate, endDate) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const startDateFormatted = start.format('D MMMM h:mmA');
  const endDateFormatted = end.format('D MMMM h:mmA');

  return `${startDateFormatted} - ${endDateFormatted}`;
};

/**
 * Định dạng ngày theo định dạng "DD/MM/YYYY"
 * @param {string} date - Ngày (ISO 8601 string)
 * @returns {string} - Chuỗi ngày đã được định dạng
 */
export const formatDate = (date) => {
  return dayjs(date).format('DD/MM/YYYY');
};

/**
 * Định dạng giờ theo định dạng "h:mm A"
 * @param {string} time - Giờ (ISO 8601 string)
 * @returns {string} - Chuỗi giờ đã được định dạng
 */
export const formatTime = (time) => {
  return dayjs(time).format('h:mm A');
};