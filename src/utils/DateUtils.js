import moment from 'moment';

export const changeDateTimeFormat = (date, format) => {
  return moment(date).format(format);
};

export const validateEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
  return passwordRegex.test(password);
}; 

export const validateConfirmPassword = (confirmPassword, password) => {
  return confirmPassword === password;
};
