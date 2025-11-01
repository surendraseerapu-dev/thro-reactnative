import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import CheckBox from 'react-native-check-box';
import AppleIcon from '../../assets/svgs/AppleIcon';
import FacebookIcon from '../../assets/svgs/FacebookIcon';
import GoogleIcon from '../../assets/svgs/GoogleIcon';
import { FilledButton } from '../../components/FilledButton';
import { black, grey, primaryColor, red, headingColor } from '../../theme/Colors';
import { useNavigation } from '@react-navigation/native';
import {
  APIServicePOST,
  APIServicePOSTWithSession,
} from '../../utils/APIService';
import {
  ROUTE_VERIFY_OTP,
  ROUTE_WEBVIEW,
  EMAIL_SIGNUP,
  VERIFY_OTP,
} from '../../utils/Constants';
import { showMessage } from 'react-native-flash-message';
import { ErrorMessage } from '../../utils/FlashMessage';
import { InputField } from '../../components/InputField';
import OTPVerify from '../OTPVerify';
import ActivityIndicatorComponent from '../../utils/ActivityIndicator';
import { apiCall } from '../../utils/apicall';
import EyeIcon from '../../assets/svgs/EyeIcon'; // You need to import your eye icon here
import EyeOffIcon from '../../assets/svgs/EyeOffIcon'; // You need to import your eye-off icon here
import { validateEmail, validatePassword, validateConfirmPassword } from '../../utils/DateUtils';

export default JoinUs = () => {
  const [tncCheck, setTncCheck] = useState(true);
  const [focus, setFocus] = useState(false);
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  /*   const bottomSheetRef = useRef < BottomSheet > null;

  // Define snap points (height levels for the sheet)
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []); */

  /*  useEffect(() => {}, focus); */

  /*   useEffect(() => {}, []); */

  const validateForm = () => {
    if (!validateEmail(email)) {
      setErrorEmail('Invalid email format');
    }

    if (!validatePassword(password)) {
      setErrorPassword('Password must be 6-10 characters long, include uppercase, lowercase, number, and special character');
    }

    if (!validateConfirmPassword(confirmPassword, password)) {
      setErrorConfirmPassword('Passwords do not match!');
    }

    if (validateEmail(email) && validatePassword(password) && validateConfirmPassword(confirmPassword, password)) {
      Submit();
    }
  }

  const Submit = async () => {
    try {
      setLoading(true);
      const request = {
        email: email,
        password: password,
      };
      const res = await apiCall(
        'POST',
        EMAIL_SIGNUP,
        request,
        null,
        null,
        null,
      );
      console.log('Signup Response:', res);
      if (res.statusCode == 200) {
        setLoading(false);
        const response = res.data;
        navigation.navigate(ROUTE_VERIFY_OTP, {
          from: 'JoinUs',
          email: email,
          test_OTP: response.otp,
        });
      } else if (res.statusCode == 400) {
        setLoading(false);
        ErrorMessage(res.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error, typeof error);
    }
  };

  useEffect(() => {
    setErrorEmail('');
  }, [email]);

  useEffect(() => {
    setErrorPassword('');
  }, [password]);

  useEffect(() => {
    setErrorConfirmPassword('');
  }, [confirmPassword]);

  useEffect(() => {
    setErrorEmail('');
    setErrorPassword('');
    setErrorConfirmPassword('');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicatorComponent text="Signing Up..." visible={loading} />
      <View>
        <Text
          style={styles.heading}>
          Join Us
        </Text>

        <Text
          style={styles.subHeading}>
          Hey! Can we get your email please?
        </Text>

        <InputField
          style={{ marginTop: '10%' }}
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
          <Text
            style={styles.errorText}>
            {errorEmail}
          </Text>
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
          <Text
            style={styles.errorText}>
            {errorPassword}
          </Text>
        )}

        <View style={styles.passwordInputFieldContainer}>
          <Text
            style={styles.passwordTextStyle}>
            Confirm Password
          </Text>
          <View
            style={styles.passwpordInputFieldView}>
            <TextInput
              style={styles.passwordInputFieldStyle}
              value={confirmPassword}
              maxLength={10}
              secureTextEntry={!showConfirmPassword} // Toggle password visibility
              onBlur={() => setFocus(false)}
              onFocus={() => setFocus(true)}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              {!showConfirmPassword ? (
                <EyeOffIcon width={24} height={24} color={primaryColor} />
              ) : (
                <EyeIcon width={24} height={24} color={primaryColor} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {errorConfirmPassword && (
          <Text
            style={styles.errorText}>
            {errorConfirmPassword}
          </Text>
        )}

        <View style={styles.termsAndConditionsContainer}>
          <CheckBox
            isChecked={tncCheck}
            onClick={() => {
              setTncCheck(!tncCheck);
            }}
            checkBoxColor={primaryColor}
            checkedCheckBoxColor={primaryColor}
            uncheckedCheckBoxColor={primaryColor}
          />

          <Text
            style={styles.termsSubText}>
            I read and accept
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTE_WEBVIEW);
            }}>
            <Text
              style={styles.termsMainText}>
              Terms &amp; Conditions
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomView}>
          <FilledButton
            onPress={() => {
              validateForm();
            }}
            lable={'Sign Up'}
          />

          <View
            style={styles.alreadyMemberContainer}>
            <Text
              style={styles.alreadyMemberText}>
              already a member?
            </Text>

            <TouchableOpacity>
              <Text
                style={styles.alreadyMemberLoginText}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  heading: {
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

  errorText: {
    marginTop: '10',
    color: red,
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
  },

  passwordInputFieldContainer: {
    marginTop: 15
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


  termsAndConditionsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },

  termsSubText: {
    marginStart: 10,
    color: grey,
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
  },

  termsMainText: {
    marginStart: 5,
    color: primaryColor,
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
  },

  bottomView: { marginTop: '20%' },

  alreadyMemberContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },

  alreadyMemberText: {
    marginStart: 10,
    color: grey,
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
  },

  alreadyMemberLoginText: {
    marginStart: 5,
    color: primaryColor,
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
  }

})
