import AsyncStorage from '@react-native-async-storage/async-storage';

const storeLocalData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

const getLocalData = async storage_Key => {
  try {
    const value = await AsyncStorage.getItem(storage_Key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

const getLocalObject = async storage_Key => {
  try {
    const jsonValue = await AsyncStorage.getItem(storage_Key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const storeLocalObject = async (storage_Key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storage_Key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export {storeLocalData, getLocalData, storeLocalObject, getLocalObject};
