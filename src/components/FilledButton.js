import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {primaryColor, white, primaryOrange} from '../theme/Colors';
import LinearGradient from 'react-native-linear-gradient';

export const FilledButton = ({
  style,
  lable,
  onPress,
  height,
  width,
  fontSize,
}) => {
  return (
    <View style={style}>
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#F3A683', '#F3A683']}
          style={{
            backgroundColor: primaryOrange,
            width: width,
            height: height || 50,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: white,
              fontFamily: 'Nunito-ExtraBold',
              fontSize: fontSize || 18,
            }}>
            {lable}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
