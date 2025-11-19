import {useNavigation} from '@react-navigation/native';
import {Image, SafeAreaView} from 'react-native';
import {useEffect, useRef, useContext} from 'react';
import {getLocalData} from '../utils/LocalStorage';
import {
  BASE_URL,
  GET_PROFILE,
  ROUTE_BOTTOM_NAVIGATION_HOST,
  ROUTE_SIGN_IN,
  SESSION_TOKEN,
} from '../utils/Constants';
import {primaryOrange} from '../theme/Colors';
import NetworkService from '../utils/NetworkService';
import {TokenContext} from '../context/TokenContext';

const Splash = () => {
  const navigation = useNavigation();
  const {setUserDetails, setSessionToken} = useContext(TokenContext);
  const hasRun = useRef(false); // Track execution

  useEffect(() => {
    if (hasRun.current) return; // Prevent re-execution
    hasRun.current = true;

    const getLandingPage = async () => {
      const res = await getLocalData(SESSION_TOKEN);
      //console.log('session', res);
      setSessionToken(res);
      if (!res) {
        navigation.replace(ROUTE_SIGN_IN);
      } else {
        getUserData(res);
      }
    };

    const getUserData = async token => {
      const data = await NetworkService.get(BASE_URL + GET_PROFILE, '', token);
      setUserDetails(data);
      navigation.replace(ROUTE_BOTTOM_NAVIGATION_HOST);
    };

    const timer = setTimeout(getLandingPage, 2000);

    return () => clearTimeout(timer);
  }, []); // Runs only on mount

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{
          height: 120,
          aspectRatio: 1.44,
          marginBottom: '20%',
          tintColor: primaryOrange,
        }}
        source={require('../assets/logos/splash_logo.png')}
      />
      <Image
        style={{
          width: 400,
          height: 260,
          position: 'absolute',
          tintColor: primaryOrange,
          bottom: 10,
        }}
        source={require('../assets/images/splash_image.png')}
      />
    </SafeAreaView>
  );
};

export default Splash;
