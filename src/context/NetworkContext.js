import React, {createContext, useContext, useState} from 'react';
import {makeGETRequest, makePOSTRequest} from '../services/Api';
import {BASE_URL} from '../utils/Constants';

const NetworkContext = createContext();

export const NetworkProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const callPostAPI = async (url, callPostAPI, request, navigation) => {
    setLoading(true);
    setError(null);

    try {
      console.log('API request of =', url, '--->', request);
      const response = await makePOSTRequest(
        BASE_URL + url,
        callPostAPI,
        request,
        navigation,
      );
      setData(response);
      console.log('API response of =', url, '--->', response.result);
      return response;
    } catch (err) {
      console.log('API Error of =', url, '--->', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const callGetAPI = async (url, callGetAPI, token, navigation) => {
    setLoading(true);
    setError(null);

    try {
      const response = await makeGETRequest(
        BASE_URL + url,
        callGetAPI,
        token,
        navigation,
      );
      setData(response);
      console.log('API response of =', url, '--->', response);
      return response;
    } catch (err) {
      console.log(err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <NetworkContext.Provider
      value={{loading, error, data, callGetAPI, callPostAPI}}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);
