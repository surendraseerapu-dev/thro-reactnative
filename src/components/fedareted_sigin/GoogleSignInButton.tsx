import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import { GOOGLE_SIGN_IN_IOS_CLIENT_ID, GOOGLE_SIGN_IN_WEB_CLIENT_ID, ROUTE_BOTTOM_NAVIGATION_HOST, SESSION_TOKEN, SOCIAL_LOGIN } from "../../utils/Constants";
import GoogleIcon from "../../assets/svgs/GoogleIcon";
import { ErrorMessage } from "../../utils/FlashMessage";
import { useContext, useState } from "react";
import { TokenContext } from "../../context/TokenContext";
import { apiCall } from "../../utils/apicall";
import { storeLocalData } from "../../utils/LocalStorage";

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

export const GoogleSignInButton = ({navigation}) => {

  const {setUserDetails, setSessionToken} = useContext(TokenContext);

  const socialSignIn = async (user?: { id: string; name: string | null; email: string; photo: string | null; familyName: string | null; givenName: string | null; }) => {
      try {
        const request = {
          provider: "google",
          providerUserId: user?.id,
          email: user?.email  
        };
        const res = await apiCall('POST', SOCIAL_LOGIN, request);
        if (res.statusCode === 200) {
          await storeLocalData(SESSION_TOKEN, res.data.authToken);
          setSessionToken(res.data.authToken);
          setUserDetails(res.data);
          
          navigation.replace(ROUTE_BOTTOM_NAVIGATION_HOST);
        } else if (res.statusCode === 400) {
          ErrorMessage(res.message);
        }
      } catch (error) {
        ErrorMessage(error)
        console.log(error);
      }
    };

  const GoogleSignIn = async (): Promise<User | null> => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const user = response.data.user;
        console.log('User Info:', user);
        socialSignIn(user);
        return response.data as User;
      } else {
        ErrorMessage(response.data);
        return null;
      }
    } catch (error) {
      ErrorMessage('An error occurred during Google Sign-In');
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            ErrorMessage("An error occurred during Google Sign-In!");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            ErrorMessage("An error occurred during Google Sign-In!");
            break;
          default:
          // some other error happened
          ErrorMessage("An error occurred during Google Sign-In!");
        }
      } else {
        // an error that's not related to google sign in occurred
        ErrorMessage("An error occurred during Google Sign-In!");
      }
      return null;
    }
  };
  
  return (
    <View>
        <TouchableOpacity 
            style={styles.socialLoginButton} 
            onPress={() => GoogleSignIn()} 
            disabled={false} 
        >
        <GoogleIcon />
        <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>
    </View>
  )
}



export default GoogleSignInButton

const styles = StyleSheet.create({

  socialLoginButton: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },

  buttonText: { color: 'black', fontWeight: '600', marginStart:15, width: '60%' }

})