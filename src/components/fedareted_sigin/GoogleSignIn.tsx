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


