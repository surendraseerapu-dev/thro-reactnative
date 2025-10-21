import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  View,
  GestureResponderEvent,
} from 'react-native';

import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import GoogleIcon from '../../assets/svgs/GoogleIcon';

// Optional: replace path with your actual asset path

// Keeps existing sign-in logic but returns the User object (or null)
export const GoogleSignIn = async (): Promise<User | null> => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (isSuccessResponse(response)) {
      Alert.alert(JSON.stringify(response.data as User));
      console.log('User Info:', response.data as User);
      return response.data as User;
    } else {
      // sign in was cancelled by user
      return null;
    }
  } catch (error) {
    Alert.alert('Error', 'An error occurred during Google Sign-In');
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // Android only, play services not available or outdated
          break;
        default:
        // some other error happened
      }
    } else {
      // an error that's not related to google sign in occurred
    }
    return null;
  }
};

// type ButtonProps = {
//   onSuccess?: (user: User) => void;
//   onError?: (err: any) => void;
//   label?: string;
//   useVectorIcon?: boolean; // if true uses vector icon, otherwise uses local image
//   style?: any;
//   disabled?: boolean;
//   onPress?: (e: GestureResponderEvent) => void; // optional custom press handler
// };

// export const GoogleSignIn: React.FC<ButtonProps> = ({
//   onSuccess,
//   onError,
//   label = 'Sign in with Google',
//   useVectorIcon = true,
//   style,
//   disabled = false,
//   onPress,
// }) => {
//   const [loading, setLoading] = useState(false);

//   const handlePress = async (e: GestureResponderEvent) => {
//     if (onPress) {
//       onPress(e);
//       return;
//     }
//     setLoading(true);
//     try {
//       // Use the GoogleSignin API instead of calling this component recursively
//       await GoogleSignin.hasPlayServices();
//       const user = await GoogleSignin.signIn();
//       if (user) {
//         onSuccess?.(Alert.alert(user));
//       } else {
//         // user cancelled or no user returned
//       }
//     } catch (err) {
//       onError?.(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <TouchableOpacity
//       style={[styles.button, style, disabled && styles.disabled]}
//       onPress={handlePress}
//       activeOpacity={0.8}
//       disabled={disabled || loading}>
//       <View style={styles.left}>
//           <GoogleIcon/>
//       </View>

//       <View style={styles.center}>
//         {loading ? (
//           <ActivityIndicator color="#000" />
//         ) : (
//           <Text style={styles.text}>{label}</Text>
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// };

const styles = StyleSheet.create({
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  left: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 14,
  },
  disabled: {
    opacity: 0.6,
  },
});
