import {showMessage} from 'react-native-flash-message';

export const SuccessMessage = msg => {
  showMessage({
    message: msg,
    type: 'success',
  });
};

export const ErrorMessage = msg => {
  showMessage({
    message: msg,
    type: 'danger',
  });
};

export const ErrorMessageWithDescription = (msg, desc) => {
  showMessage({
    message: msg,
    type: 'danger',
    description: desc,
  });
};

export const WarningMessage = msg => {
  showMessage({
    message: msg,
    type: 'warning',
  });
};
