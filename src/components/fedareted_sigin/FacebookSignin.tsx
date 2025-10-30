import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AccessToken, GraphRequest, GraphRequestManager, Settings } from 'react-native-fbsdk-next';
import FacebookIcon from '../../assets/svgs/FacebookIcon';
const { LoginManager } = require('react-native-fbsdk-next');

export const FacebookSignin = () => {
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
              console.log(result);
              Alert.alert('Success fetching data: ' + JSON.stringify(result));
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