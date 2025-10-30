import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import { GOOGLE_SIGN_IN_IOS_CLIENT_ID, GOOGLE_SIGN_IN_WEB_CLIENT_ID } from "../../utils/Constants";
import { GoogleSignIn } from "./GoogleSignIn";
import GoogleIcon from "../../assets/svgs/GoogleIcon";

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

export const GoogleSignInButton = () => {
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