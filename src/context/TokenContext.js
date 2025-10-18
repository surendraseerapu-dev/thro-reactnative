import {createContext, useState} from 'react';

export const TokenContext = createContext();

export const TokenProvider = props => {
  const [userDetails, setUserDetails] = useState();
  const [sessionToken, setSessionToken] = useState();
  const [interests, setInterests] = useState([]);

  return (
    <TokenContext.Provider
      value={{
        userDetails,
        setUserDetails,
        sessionToken,
        setSessionToken,
        interests,
        setInterests,
      }}>
      {props.children}
    </TokenContext.Provider>
  );
};
