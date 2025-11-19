import React, { useState, useContext, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import { black, grey, headingColor, primaryColor, red, primaryOrange } from '../theme/Colors';
import { ErrorMessage } from '../utils/FlashMessage';
import {
  ROUTE_JOIN_US,
  EMAIL_SIGNIN,
  ROUTE_BOTTOM_NAVIGATION_HOST,
  SESSION_TOKEN,
} from '../utils/Constants';

import { storeLocalData } from "../utils/LocalStorage";
import { InputField } from '../components/InputField';
import { apiCall } from '../utils/apicall';
import ActivityIndicatorComponent from '../utils/ActivityIndicator';
import { FilledButton } from '../components/FilledButton';
import EyeIcon from '../assets/svgs/EyeIcon'; // You need to import your eye icon here
import EyeOffIcon from '../assets/svgs/EyeOffIcon'; // You need to import your eye-off icon here
import { validateEmail, validatePassword } from '../utils/DateUtils';
import { TokenContext } from '../context/TokenContext';

// ...existing code...
import { FacebookSignin } from '../components/fedareted_sigin/FacebookSignin';
import { GoogleSignInButton } from '../components/fedareted_sigin/GoogleSignInButton';

export default SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUserDetails, setSessionToken } = useContext(TokenContext);

  const validateForm = () => {
    if (!validateEmail(email)) {
      setErrorEmail('Invalid email format');
    }

    if (!validatePassword(password)) {
      setErrorPassword('Password must be 6-10 characters long, include uppercase, lowercase, number, and special character');
    }

    if (validateEmail(email) && validatePassword(password)) {
      validateSignIn();
    }
  }

  const validateSignIn = async () => {
    try {
      setLoading(true);
      const request = {
        email: email,
        password: password,
      };
      const res = await apiCall('POST', EMAIL_SIGNIN, request);
      if (res.statusCode === 200) {
        setLoading(false);
        await storeLocalData(SESSION_TOKEN, res.data.authToken);
        setSessionToken(res.data.authToken);
        setUserDetails(res.data);
        navigation.replace(ROUTE_BOTTOM_NAVIGATION_HOST);
      } else if (res.statusCode === 400) {
        setLoading(false);
        ErrorMessage(res.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setErrorEmail('');
  }, [email]);

  useEffect(() => {
    setErrorPassword('');
  }, [password]);

  useEffect(() => {
    setErrorEmail('');
    setErrorPassword('');
  }, []);


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
        heading={'Email'}
        value={email}
        onBlur={val => {
          setFocus(false);
        }}
        onFocus={val => {
          setFocus(true);
        }}
        onChangeText={val => setEmail(val)}
      />

      {errorEmail && (
        <View style={styles.errortextView}>
        <Text
          style={styles.errorText}>
          {errorEmail}
        </Text>
        </View>
      )}
      <View style={styles.passwordInputFieldContainer}>
        <Text
          style={styles.passwordTextStyle}>
          Password
        </Text>
        <View
          style={styles.passwpordInputFieldView}>
          <TextInput
            style={styles.passwordInputFieldStyle}
            value={password}
            maxLength={10}
            secureTextEntry={!showPassword} // Toggle password visibility
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {!showPassword ? (
              <EyeOffIcon width={24} height={24} color={primaryColor} />
            ) : (
              <EyeIcon width={24} height={24} color={primaryColor} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {errorPassword && (
        <View style={styles.errortextView}>
        <Text
          style={styles.errorText}>
          {errorPassword}
        </Text>
        </View>
      )}

      <View style={styles.forgotPasswordContainer}>
        <Text
          style={{
            color: primaryOrange,
            fontFamily: 'Nunito-Bold',
            fontSize: 15,
          }}>
          Forgot Password?
        </Text>
      </View>


      <View style={{ width: '80%', marginTop: 20 }}>
        <FilledButton lable={'Log In'} onPress={validateForm} />

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
                color: primaryOrange,
                fontFamily: 'Nunito-Medium',
                fontWeight: 500,
                fontSize: 15,
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ width: '80%', marginTop: '20%', alignItems: 'center' }}>
        <View style={styles.socialLoginButton}>
          <FacebookSignin 
          navigation={navigation}
          />
        </View>

        <View style={[styles.socialLoginButton, { marginTop: 15 }]}>
          <GoogleSignInButton 
          navigation={navigation}
          />
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
    marginTop: '25%',
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

  passwordInputFieldContainer: {
    marginTop: 25,
    width: '80%',
  },

  passwordTextStyle: {
    fontSize: 15,
    fontFamily: 'Nunito-Bold',
    color: headingColor,
  },

  passwpordInputFieldView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: grey,
  },

  passwordInputFieldStyle: { flex: 1, paddingVertical: 10, fontSize: 16 },

  errortextView: { width: '80%', flexDirection: 'row' },
  
  errorText: {
    marginTop: '10',
    color: red,
    textAlign: 'left',
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
  },

  forgotPasswordContainer: {
    width: '80%',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'flex-start'
  },

  socialLoginButton: {
    width: '100%',
    borderColor: primaryOrange,
    flexDirection: 'row',
    height: 40,
    borderRadius: 30,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  }


});
