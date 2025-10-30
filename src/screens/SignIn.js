import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import { black, grey, headingColor, primaryColor } from '../theme/Colors';
import { useNavigation } from '@react-navigation/native';
import { ErrorMessage } from '../utils/FlashMessage';
import {
  SEND_OTP_FOR_LOGIN,
  ROUTE_VERIFY_OTP,
  ROUTE_JOIN_US
} from '../utils/Constants';
import { InputField } from '../components/InputField';
import { apiCall } from '../utils/apicall';
import ActivityIndicatorComponent from '../utils/ActivityIndicator';
import { FilledButton } from '../components/FilledButton';
import EyeIcon from '../assets/svgs/EyeIcon'; // You need to import your eye icon here
import EyeOffIcon from '../assets/svgs/EyeOffIcon'; // You need to import your eye-off icon here

// ...existing code...
import { FacebookSignin } from '../components/fedareted_sigin/FacebookSignin';
import { GoogleSignInButton } from '../components/fedareted_sigin/GoogleSignInButton';

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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ActivityIndicatorComponent visible={loading} text="Signing In..." />
      <Text
        style={styles.heading}>
        Log In
      </Text>

      <Text
        style={styles.subHeading}>
        Enter your credentials to Login
      </Text>

      <InputField
        style={styles.inputFieldStyle}
        heading="Mobile No"
        value={mobileNo}
        maxLength={10}
        inputMode="numeric"
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        onChangeText={setMobileNo}
      />

      <View style={styles.passwordInputFieldStyle}>
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

      <View style={styles.forgotPasswordContainer}>
        <Text
          style={{
          color: primaryColor,
          fontFamily: 'Nunito-Bold',
          fontSize: 15,
        }}>
        Forgot Password?
      </Text>
      </View>      


      {!focus && (
        <View style={{ width: '80%', marginTop: 20 }}>
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
      
      <View style={{ width: '80%' , marginTop: '20%', alignItems: 'center' }}>
          <View style={styles.socialLoginButton}>
            <FacebookSignin />
           </View>
          
          <View style={[styles.socialLoginButton, { marginTop: 15 }]}>
          <GoogleSignInButton />
          </View>
      </View>

    </KeyboardAvoidingView>
    
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
  },

  heading: {
    marginTop: '35%',
    alignSelf: 'center',
    color: black,
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 30,
  },

  subHeading: {
    marginTop: 10,
    alignSelf: 'center',
    color: grey,
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
  },

  inputFieldStyle: {
     marginTop: '20%',
     width: '80%',

  }, 

  passwordInputFieldStyle: {
    marginTop: 15,
    width: '80%',
  },

  forgotPasswordContainer: { 
    width: '80%', 
    flexDirection: 'row', 
    marginTop: 15, 
    justifyContent: 'flex-start' 
  },

  socialLoginButton: {
    width: '100%',
    borderColor: primaryColor,
    flexDirection: 'row',
    height: 40,
    borderRadius: 30,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  }


});
