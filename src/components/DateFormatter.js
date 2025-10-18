// DateFormatter.js

import moment from 'moment';

/**
 * Converts a Date object into a format suitable for backend submission.
 * Example output: "2025-06-08T18:15:30.000Z"
 */
export const sendDateToBackend = date => {
  return moment(date).toISOString(); // or customize as needed
};

/**
 * Formats a Date object into a readable format for user display.
 * Example output: "Jun 08, 06:45 pm"
 */
export const formateDate = date => {
  return moment(date).format('MMM DD, hh:mm a');
};

/**
 * Converts a Date object to DD/MM/YYYY format.
 * Example output: "08/06/2025"
 */
export const changeToStandardFormat = date => {
  return moment(date).format('DD/MM/YYYY');
};

/**
 * Formats a Date object into a standard display format with weekday and GMT.
 * Example output: "Sun, 08 Jun 2025, 06:45:00 GMT"
 */
export const displayDateWithGMT = date => {
  return moment(date).format('ddd, DD MMM YYYY, hh:mm:ss [GMT]');
};
