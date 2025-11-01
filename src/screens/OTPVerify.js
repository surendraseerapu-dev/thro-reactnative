import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
import {Platform, SafeAreaView, Text, View} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import {FilledButton} from '../components/FilledButton';
import {TokenContext} from '../context/TokenContext';
import {black, grey, primaryColor} from '../theme/Colors';
import ActivityIndicatorComponent from '../utils/ActivityIndicator';
import {
  ROUTE_BOTTOM_NAVIGATION_HOST,
  ROUTE_CHOOSE_INTERESTS,
  ROUTE_PERSONAL_DETAILS,
  SESSION_TOKEN,
  USER_SESSION_FOR_SIGNUP,
  VERIFY_LOGIN_OTP,
  VERIFY_SIGNUP_OTP,
} from '../utils/Constants';
import {ErrorMessage} from '../utils/FlashMessage';
import {storeLocalData} from '../utils/LocalStorage';
import {apiCall} from '../utils/apicall';

export default SignIn = ({route}) => {
  const {from} = route.params;
  const {test_OTP} = route.params;
  const {email} = route.params;
  const [otp, setOtp] = useState('');
  const [focus, setFocus] = useState(false);
  const [fcmToken, setFcmToken] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {setUserDetails, setSessionToken} = useContext(TokenContext);

  useEffect(() => {
    checkToken();
  });

  const checkToken = async () => {
    try {
      setFcmToken(await messaging().getToken());
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
      } else {
        console.log('NO FCM Token Available already');
      }
    } catch (error) {
      console.error('Error getting fcm token:', error);
    }
  };

  useEffect(() => {
    console.log(otp.length);
  }, [otp]);

  const validateLoginOTP = async () => {
    if (otp.length != 6) {
      ErrorMessage('Please input 6 digit OTP');
      return;
    }
    try {
      setLoading(true);
      const request = {
        email: email,
        otp: otp,
        type:
          from == 'JoinUs'
            ? 'SIGNUP'
            : from == 'ForgotPassword'
            ? 'FORGOT_PASSWORD'
            : null,
      };
      console.log(request);
      if (from == 'JoinUs') {
        const res = await apiCall(
          'POST',
          VERIFY_SIGNUP_OTP,
          request,
          null,
          false,
          '',
        );
        if (res.statusCode == 200) {
          setLoading(false);
          await storeLocalData(USER_SESSION_FOR_SIGNUP, res.data.authToken);
          if (res.data.interests.length == 0 && res.data.userName.length == 0) {
            navigation.navigate(ROUTE_PERSONAL_DETAILS, {
              authToken: res.data.authToken,
            });
          } else {
            navigation.navigate(ROUTE_CHOOSE_INTERESTS, {
              authToken: res.data.authToken,
            });
          }
        } else if (res.statusCode == 400) {
          setLoading(false);
          ErrorMessage(res.message);
        }
      // } else if (from == 'SignIn') {
      //   const res = await apiCall(
      //     'POST',
      //     VERIFY_LOGIN_OTP,
      //     loginReques,
      //     null,
      //     false,
      //     null,
      //     Platform.OS,
      //     fcmToken,
      //   );
      //   if (res.statusCode == 200) {
      //     setLoading(false);

      //     console.log('kyaAayaHai', JSON.stringify(res));
      //     await storeLocalData(SESSION_TOKEN, res.data.authToken);
      //     setSessionToken(res.data.authToken);
      //     setUserDetails(res.data);

      //     navigation.navigate(ROUTE_BOTTOM_NAVIGATION_HOST);
      //   } else if (res.statusCode == 400) {
      //     setLoading(false);
      //     ErrorMessage(res.message);
      //   }
      // } else if (from == 'ForgotPassword') {
      }
    } catch (error) {
      setLoading(false);
      console.log(error, typeof error);
    }
  };

  return (
    <SafeAreaView style={{height: '100%', marginHorizontal: 30}}>
      <ActivityIndicatorComponent text="Verifing OTP..." visible={loading} />
      <Text
        style={{
          marginTop: '35%',
          alignSelf: 'center',
          color: black,
          fontFamily: 'Nunito-ExtraBold',
          fontSize: 30,
        }}>
        Verification
      </Text>

      <Text
        style={{
          marginTop: 10,
          alignSelf: 'center',
          color: grey,
          fontFamily: 'Nunito-Regular',
          fontSize: 15,
          textAlign: 'center',
        }}>
        Please enter the 6-digits {test_OTP} sent to your email: {email}
      </Text>

      <OTPTextView
        autoFocus={true}
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
          marginTop: 20,
          paddingVertical: 20,
        }}
        textInputStyle={{
          borderRadius: 10,
          borderWidth: 0.5,
          fontFamily: 'Nunito-Bold',
          color: primaryColor,
          fontSize: 15,
        }}
        text={otp}
        handleTextChange={val => {
          setOtp(val);
        }}
        setValue={otp}
        inputCount={6}
        tintColor={primaryColor}
        offTintColor={grey}
      />

      <Text
        style={{
          marginTop: 15,
          color: grey,
          fontFamily: 'Nunito-Regular',
          fontSize: 15,
        }}>
        Resend OTP in 00:59
      </Text>

      {!focus && (
        <View style={{width: '100%', position: 'absolute', bottom: '10%'}}>
          <FilledButton
            lable={'Verify'}
            onPress={() => {
              validateLoginOTP();
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
