import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { black, grey, headingColor, primaryColor, white } from '../theme/Colors';
import { useNavigation } from '@react-navigation/native';
import { ErrorMessage } from '../utils/FlashMessage';
import {
  SEND_OTP_FOR_LOGIN,
  ROUTE_VERIFY_OTP,
  ROUTE_JOIN_US,
  GOOGLE_SIGN_IN_WEB_CLIENT_ID,
  GOOGLE_SIGN_IN_IOS_CLIENT_ID
} from '../utils/Constants';
import { InputField } from '../components/InputField';
import { apiCall } from '../utils/apicall';
import ActivityIndicatorComponent from '../utils/ActivityIndicator';
import LinearGradient from 'react-native-linear-gradient';
import { FilledButton } from '../components/FilledButton';
import EyeIcon from '../assets/svgs/EyeIcon'; // You need to import your eye icon here
import EyeOffIcon from '../assets/svgs/EyeOffIcon'; // You need to import your eye-off icon here

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// ...existing code...
import { FacebookSignin } from '../components/fedareted_sigin/FacebookSignin';
import { GoogleSignIn } from '../components/fedareted_sigin/GoogleSignIn';

// ...existing code...
GoogleSignin.configure({
  webClientId: GOOGLE_SIGN_IN_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  scopes: [
    /* what APIs you want to access on behalf of the user, default is email and profile
    this is just an example, most likely you don't need this option at all! */
    'https://www.googleapis.com/auth/drive.readonly',
  ],
  forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
  iosClientId: GOOGLE_SIGN_IN_IOS_CLIENT_ID // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

export default SignIn = () => {
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [tncCheck, setTncCheck] = useState(true);
  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigation = useNavigation();

  const validateSignIn = async () => {
    if (mobileNo.length !== 10) {
      ErrorMessage('Enter 10 digit mobile number');
      return;
    }

    if (password.length < 8 || password.length > 15) {
      ErrorMessage('Password must contain 8-15 characters');
      return;
    }

    try {
      setLoading(true);
      const request = {
        mobileNo: mobileNo,
        password: password,
      };
      const res = await apiCall('POST', SEND_OTP_FOR_LOGIN, request);
      if (res.statusCode === 200) {
        setLoading(false);
        navigation.navigate(ROUTE_VERIFY_OTP, {
          from: 'SignIn',
          mobileNo: mobileNo,
        });
      } else if (res.statusCode === 400) {
        setLoading(false);
        ErrorMessage(res.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ height: '100%', marginHorizontal: 30 }}>
      <ActivityIndicatorComponent visible={loading} text="Signing In..." />
      <Text
        style={{
          marginTop: '35%',
          alignSelf: 'center',
          color: black,
          fontFamily: 'Nunito-ExtraBold',
          fontSize: 30,
        }}>
        Log In
      </Text>

      <Text
        style={{
          marginTop: 10,
          alignSelf: 'center',
          color: grey,
          fontFamily: 'Nunito-Regular',
          fontSize: 15,
        }}>
        Enter your credentials to Login
      </Text>

      <InputField
        style={{ marginTop: '30%' }}
        heading="Mobile No"
        value={mobileNo}
        maxLength={10}
        inputMode="numeric"
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        onChangeText={setMobileNo}
      />

      <View style={{ marginTop: 15 }}>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'Nunito-Bold',
            color: headingColor,
          }}>
          Password
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: grey,
          }}>
          <TextInput
            style={{ flex: 1, paddingVertical: 10, fontSize: 16 }}
            value={password}
            maxLength={16}
            secureTextEntry={!showPassword} // Toggle password visibility
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOffIcon width={24} height={24} color={primaryColor} />
            ) : (
              <EyeIcon width={24} height={24} color={primaryColor} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={{
          marginTop: 15,
          color: primaryColor,
          fontFamily: 'Nunito-Bold',
          fontSize: 15,
        }}>
        Forgot Password?
      </Text>

      {!focus && (
        <View style={{ width: '100%', marginTop: 20 }}>
          <FilledButton lable={'Log In'} onPress={validateSignIn} />

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                marginStart: 10,
                color: grey,
                fontFamily: 'Nunito-Medium',
                fontSize: 15,
              }}>
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTE_JOIN_US)}>
              <Text
                style={{
                  marginStart: 5,
                  color: primaryColor,
                  fontFamily: 'Nunito-Medium',
                  fontWeight: 500,
                  fontSize: 15,
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={{ width: '100%', position: 'absolute', bottom: '5%', alignItems: 'center' }}>
        {/* Both child views share the same width and are centered */}
        <View style={{ width: '90%'}}>
          <FacebookSignin />
        </View>

        <View style={{ width: '100%', marginTop: 10, alignItems: 'center'}}>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => GoogleSignIn()}
            disabled={false}
          />
        </View>
      </View>
      
    </KeyboardAvoidingView>
  );
};
