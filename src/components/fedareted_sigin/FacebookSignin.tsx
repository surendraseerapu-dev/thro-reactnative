import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { AccessToken, GraphRequest, GraphRequestManager, Settings } from 'react-native-fbsdk-next';
import FacebookIcon from '../../assets/svgs/FacebookIcon';
import { ROUTE_BOTTOM_NAVIGATION_HOST, ROUTE_VERIFY_OTP, SESSION_TOKEN, SOCIAL_LOGIN } from '../../utils/Constants';
import { apiCall } from '../../utils/apicall';
import { useNavigation } from '@react-navigation/native';
import { ErrorMessage } from '../../utils/FlashMessage';
import { TokenContext } from '../../context/TokenContext';
import { storeLocalData } from '../../utils/LocalStorage';

export const FacebookSignin = () => {

  const { LoginManager } = require('react-native-fbsdk-next');
  const {setUserDetails, setSessionToken} = useContext(TokenContext);
  const [providerUserId, setProviderUserId] = useState();
  const [email, setEmail] = useState();
  const navigation = useNavigation();

  const socialSignIn = async () => {
        
      try {
        // setLoading(true);
        const request = {
          provider: "facebook",
          providerUserId: providerUserId,
          email: email  
        };
        const res = await apiCall('POST', SOCIAL_LOGIN, request);
        if (res.statusCode === 200) {
          // setLoading(false);
          await storeLocalData(SESSION_TOKEN, res.data.authToken);
          setSessionToken(res.data.authToken);
          setUserDetails(res.data);
          
          navigation.navigate(ROUTE_BOTTOM_NAVIGATION_HOST);
        } else if (res.statusCode === 400) {
          // setLoading(false);
          ErrorMessage(res.message);
        }
      } catch (error) {
        // setLoading(false);
        console.log(error);
      }
    };

  return (
  <View>
    {/* Custom Facebook login button with an icon */}
    <TouchableOpacity
      style={styles.socialLoginButton}
      onPress={async () => {
        try {
          const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
          if (result.isCancelled) {
            Alert.alert('Login is cancelled.');
            return;
          }

          const data = await AccessToken.getCurrentAccessToken();
          if (!data) {
            Alert.alert('Failed to obtain access token.');
            return;
          }
          const accessToken = data.accessToken;
          // optional: show token (for debugging)
          // Alert.alert(accessToken.toString());

          const responseInfoCallback = (error: any, result: any) => {
            if (error) {
              console.log(error);
              Alert.alert('Error fetching data: ' + error.toString());
            } else {
              console.log("Success:",result)
              setProviderUserId(result.id);
              setEmail(result.email);
              socialSignIn();
            }
          };

          const infoRequest = new GraphRequest(
            '/me',
            {
              accessToken: accessToken,
              parameters: {
                fields: {
                  string: 'email,name,first_name,middle_name,last_name',
                },
              },
            },
            responseInfoCallback
          );

          new GraphRequestManager().addRequest(infoRequest).start();
        } catch (err) {
          Alert.alert('Login has error: ' + (err && (err as any).message ? (err as any).message : String(err)));
        }
      }}
    >
      <FacebookIcon />
      <Text style={styles.buttonText}>Continue with Facebook</Text>
    </TouchableOpacity>
  </View>
  )
}

export default FacebookSignin

const styles = StyleSheet.create({

  socialLoginButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: { color: 'black', fontWeight: '600', marginStart:15, width: '60%' }
})