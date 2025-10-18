import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {appStyle} from '../theme/AppStyle';
import {black, green, grey, red} from '../theme/Colors';

export const InputField = ({
  style,
  heading,
  value,
  onBlur,
  onFocus,
  isEditable,
  placeholder,
  inputMode,
  maxLength,
  onChangeText,
  rightIcon,
  onPress,
  error,
  errorMsg,
  success,
  successMsg,
  secureTextEntry,
}) => {
  return (
    <View style={style}>
      <Text style={[appStyle.textSubHeading]}>{heading}</Text>

      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TextInput
          style={[appStyle.textRegular, {width: '90%'}]}
          value={value}
          onBlur={onBlur}
          onFocus={onFocus}
          secureTextEntry={secureTextEntry}
          editable={isEditable}
          onChangeText={onChangeText}
          placeholder={placeholder}
          inputMode={inputMode}
          maxLength={maxLength}
        />

        {rightIcon}
      </TouchableOpacity>

      <View style={{height: 1, width: '100%', backgroundColor: grey}} />

      {error && (
        <Text
          style={[
            appStyle.textRegular,
            {width: '90%', color: red, marginTop: 3},
          ]}>
          {errorMsg}
        </Text>
      )}

      {success && (
        <Text
          style={[
            appStyle.textRegular,
            {width: '90%', color: green, marginTop: 3},
          ]}>
          {successMsg}
        </Text>
      )}
    </View>
  );
};
