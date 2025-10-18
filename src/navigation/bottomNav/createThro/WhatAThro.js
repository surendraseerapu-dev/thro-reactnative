import {Image, Text, View} from 'react-native';
import {primaryColor} from '../../../theme/Colors';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  ROUTE_BOTTOM_NAVIGATION_HOST,
  ROUTE_DASHBOARD,
} from '../../../utils/Constants';

export default WhatAThro = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(ROUTE_BOTTOM_NAVIGATION_HOST);
    }, 2000);
  }, []);

  return (
    <View
      style={{
        backgroundColor: primaryColor,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{height: 120, aspectRatio: 1.06}}
        source={require('../../../assets/images/success_thro.png')}
      />

      <Text
        style={{
          color: '#FFF0D4',
          fontSize: 50,
          fontFamily: 'Nunito-ExtraBold',
          textAlign: 'center',
        }}>
        {'WHAT\nA THRO !'}
      </Text>
    </View>
  );
};
