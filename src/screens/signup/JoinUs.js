import {useEffect, useMemo, useRef, useState} from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import AppleIcon from '../../assets/svgs/AppleIcon';
import FacebookIcon from '../../assets/svgs/FacebookIcon';
import GoogleIcon from '../../assets/svgs/GoogleIcon';
import {FilledButton} from '../../components/FilledButton';
import {black, grey, primaryColor, red} from '../../theme/Colors';
import {useNavigation} from '@react-navigation/native';
import {
  APIServicePOST,
  APIServicePOSTWithSession,
} from '../../utils/APIService';
import {
  ROUTE_VERIFY_OTP,
  ROUTE_WEBVIEW,
  SEND_OTP_FOR_SIGNUP,
  VERIFY_OTP,
} from '../../utils/Constants';
import {showMessage} from 'react-native-flash-message';
import {ErrorMessage} from '../../utils/FlashMessage';
import {InputField} from '../../components/InputField';
import OTPVerify from '../OTPVerify';
import ActivityIndicatorComponent from '../../utils/ActivityIndicator';
import {apiCall} from '../../utils/apicall';
//import BottomSheet from '@gorhom/bottom-sheet';

export default JoinUs = () => {
  const [tncCheck, setTncCheck] = useState(true);
  const [focus, setFocus] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  /*   const bottomSheetRef = useRef < BottomSheet > null;

  // Define snap points (height levels for the sheet)
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []); */

  /*  useEffect(() => {}, focus); */

  /*   useEffect(() => {}, []); */

  const Submit = async () => {
    if (mobileNo.length != 10) {
      ErrorMessage('Enter 10 digit mobile number');
      return;
    }

    try {
      setLoading(true);
      const request = {
        mobileNo: mobileNo,
      };
      const res = await apiCall(
        'POST',
        SEND_OTP_FOR_SIGNUP,
        request,
        null,
        null,
        null,
      );
      if (res.statusCode == 200) {
        setLoading(false);
        navigation.navigate(ROUTE_VERIFY_OTP, {
          from: 'JoinUs',
          mobileNo: mobileNo,
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

  return (
    <SafeAreaView style={{height: '100%', marginHorizontal: 30}}>
      <ActivityIndicatorComponent text="Signing Up..." visible={loading} />
      <Text
        style={{
          marginTop: '35%',
          alignSelf: 'center',
          color: black,
          fontFamily: 'Nunito-ExtraBold',
          fontSize: 30,
        }}>
        Join Us
      </Text>

      <Text
        style={{
          marginTop: 10,
          alignSelf: 'center',
          color: grey,
          fontFamily: 'Nunito-Regular',
          fontSize: 15,
        }}>
        Hey! Can we get your number please?
      </Text>

      <InputField
        style={{marginTop: '30%'}}
        heading={'Mobile No'}
        value={mobileNo}
        maxLength={10}
        inputMode={'numeric'}
        onBlur={val => {
          setFocus(false);
        }}
        onFocus={val => {
          setFocus(true);
        }}
        onChangeText={val => setMobileNo(val)}
      />

      {error && (
        <Text
          style={{
            marginTop: '10',
            color: red,
            fontFamily: 'Nunito-Regular',
            fontSize: 15,
          }}>
          {' '}
          {errorMsg}{' '}
        </Text>
      )}
      <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
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
          style={{
            marginStart: 10,
            color: grey,
            fontFamily: 'Nunito-Regular',
            fontSize: 15,
          }}>
          I read and accept
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ROUTE_WEBVIEW);
          }}>
          <Text
            style={{
              marginStart: 5,
              color: primaryColor,
              fontFamily: 'Nunito-Regular',
              fontSize: 15,
            }}>
            Terms &amp; Conditions
          </Text>
        </TouchableOpacity>
      </View>

      {!focus && (
        <View style={{width: '100%', position: 'absolute', bottom: '5%'}}>
          <FilledButton
            onPress={() => {
              Submit();
            }}
            lable={'Sign Up'}
          />

          <Text
            style={{
              marginVertical: 20,
              color: grey,
              fontFamily: 'Nunito-Regular',
              fontSize: 15,
              alignSelf: 'center',
            }}>
            or
          </Text>

          {/*      <Button
            title="Open Bottom Sheet"
            onPress={() => bottomSheetRef.current?.expand()}
          />

          <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
            <View>
              <Text> Hello, I am a Bottom Sheet! </Text>
            </View>
          </BottomSheet> */}

          <TouchableOpacity
            style={{
              borderColor: primaryColor,
              flexDirection: 'row',
              height: 50,
              borderRadius: 30,
              borderWidth: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                color: primaryColor,
                fontFamily: 'Nunito-ExtraBold',
                fontSize: 17,
                textAlign: 'right',
                marginEnd: 5,
              }}>
              Sign Up with
            </Text>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <View style={{marginHorizontal: 5}}>
                <AppleIcon />
              </View>
              <View style={{marginHorizontal: 5}}>
                <FacebookIcon />
              </View>
              <View style={{marginHorizontal: 5}}>
                <GoogleIcon />
              </View>
            </View>
          </TouchableOpacity>

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
                fontFamily: 'Nunito-Regular',
                fontSize: 15,
              }}>
              already a member?
            </Text>

            <TouchableOpacity /* onPress={{}} */>
              <Text
                style={{
                  marginStart: 5,
                  color: primaryColor,
                  fontFamily: 'Nunito-Regular',
                  fontSize: 15,
                }}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
