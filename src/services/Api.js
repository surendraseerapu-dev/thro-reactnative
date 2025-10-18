import {showMessage} from 'react-native-flash-message';
import {getLocalData, storeLocalData} from '../utils/LocalStorage';
import {BASE_URL} from '../utils/Constants';

export const makeGETRequest = async (url, token, navigation) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token, // Authentication token
      },
    });

    if (response.status == 401) {
      showMessage({
        message: 'Unauthorized Access',
        description:
          'Your login session expired, Please login again to contiunue',
        type: 'danger',
      });
      /* await storeLocalData(SESSION_TOKEN, '');
      navigation.navigate('EnterMobile'); */
    } else if (!response.ok) {
      throw new Error(`HTTP error! Status:',' ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const makePOSTRequest = async (url, request) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'x-auth-token': token, // Authentication token
      },
      body: JSON.stringify(request),
    });
    console.log(response.result);
    if (response.status == 401) {
      showMessage({
        message: 'Unauthorized Access',
        description:
          'Your login session expired, Please login again to contiunue',
        type: 'danger',
      });
    } else if (!response.ok) {
      throw new Error(`HTTP error! Status:' ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
