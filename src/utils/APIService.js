import {ActivityIndicator} from 'react-native';
import {BASE_URL} from './Constants';
import {getLocalData} from './LocalStorage';

export const APIServiceGET = async endPoint => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    const response = await fetch(BASE_URL + endPoint, requestOptions);
    const json = await response.json();

    console.log('API Response of---', endPoint, '--->', JSON.stringify(json));
    return json;
  } catch (error) {
    console.error(('API Error of---', endPoint, '--->', error));
  } finally {
    // setLoading(false);
  }
};

export const APIServiceGETWithQueryParam = async (param, endPoint) => {
  try {
    const query = endPoint + `?userName=${encodeURIComponent(param)}`;

    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json', // Use 'Accept' header as specified in the curl
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(BASE_URL + query, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    console.log('API Response of---', endPoint, '--->', JSON.stringify(json));
    return json;
  } catch (error) {
    console.error('API Error of---', endPoint, '--->', error);
  } finally {
    // setLoading(false);
  }
};

export const APIServicePOST = async (request, endPoint) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(request),
    };
    console.log('API Request of----', endPoint, '--->', request);
    const response = await fetch(BASE_URL + endPoint, requestOptions);
    const json = await response.json();

    console.log('API Response of---', endPoint, '--->', JSON.stringify(json));
    return json;
  } catch (error) {
    console.error(('API Error of---', endPoint, '--->', error));
  } finally {
  }
};

/* export const APIServicePUT = async (request, endPoint, token) => {
    try {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'x-auth-token': token }
        };
        console.log("API Request of ==>", endPoint, request);
        const response = await fetch(BASE_URL + endPoint, requestOptions)

        if (response.status == 200) {
            const json = await response.json();
            console.log("API Response of ==>", endPoint, JSON.stringify(json))
            return json;
        } else if (response.status == 400) {
            const json = await response.json();
            throw json;
        }
        else if (response.status == 401) {

        }
        else if (response.status == 403) {

        }
        else if (response.status == 500) {

        }

    } catch (error) {
        console.error(("API Response of ==>", endPoint, error));
    }
}; */

export const APIServicePOSTWithSession = async (
  method,
  request,
  endPoint,
  token,
) => {
  try {
    const requestOptions = {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: request,
    };
    console.log('API Request of ==>', endPoint, requestOptions);
    const response = await fetch(BASE_URL + endPoint, requestOptions);

    if (response.status == 200) {
      const json = await response.json();
      console.log('API Response of ==>', endPoint, JSON.stringify(json));
      return json;
    } else if (response.status == 400) {
      const json = await response.json();
      console.log('API Response of ==>', endPoint, JSON.stringify(json));
      throw json;
    } else if (response.status == 401) {
    } else if (response.status == 403) {
    } else if (response.status == 500) {
    }
  } catch (error) {
    console.error(('API Response of ==>', endPoint, error));
  }
};
