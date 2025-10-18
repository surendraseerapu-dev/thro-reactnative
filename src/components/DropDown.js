import React from 'react';
import {Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {appStyle} from '../theme/AppStyle';
import {black, grey} from '../theme/Colors';

export const DropDown = ({
  style,
  heading,
  data,
  value,
  selectedValue,
  label,
}) => {
  return (
    <View style={style}>
      <Text style={[appStyle.textSubHeading]}>{heading}</Text>

      <Dropdown
        style={{marginTop: 10}}
        placeholderStyle={{color: black, fontFamily: 'Nunito-Regular'}}
        selectedTextStyle={{color: black, fontFamily: 'Nunito-Regular'}}
        itemTextStyle={{color: black, fontFamily: 'Nunito-Regular'}}
        label="Select Value"
        value={value || ''}
        labelField={label}
        valueField={label}
        data={data}
        placeholder="Select Value"
        onChange={selectedValue}
        containerStyle={{justifyContent: 'flex-end'}}
      />

      <View
        style={{height: 1, width: '100%', backgroundColor: grey, marginTop: 15}}
      />
    </View>
  );
};
