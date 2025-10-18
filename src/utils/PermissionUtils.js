// permissionUtils.js

import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

// Function to check permission
export const checkPermission = async permission => {
  try {
    const result = await check(permission);
    return result;
  } catch (error) {
    console.error('Permission Check Error:', error);
    return null;
  }
};

// Function to request permission
export const requestPermission = async permission => {
  try {
    const result = await request(permission);
    return result;
  } catch (error) {
    console.error('Permission Request Error:', error);
    return null;
  }
};
