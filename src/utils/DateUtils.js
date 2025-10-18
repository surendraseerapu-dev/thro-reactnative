import moment from 'moment';

export const changeDateTimeFormat = (date, format) => {
  return moment(date).format(format);
};
