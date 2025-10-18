import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { appStyle } from '../theme/AppStyle';
import { black, grey, primaryColor } from '../theme/Colors';
import Slider from '@react-native-community/slider';

export const SeekSlider = ({style,heading,subheading,value,onValueChange,minimumValue,maximumValue}) => {
  
  return (

  <View style={style}>
    <Text style={[appStyle.textSubHeading]}> 
        {heading}
    </Text>

    <Text style={[appStyle.textRegular,{marginTop:5}]}>{subheading}</Text>
        <Slider
            style={{ height: 50,marginHorizontal:-15}}
            minimumValue={minimumValue}
            maximumValue={maximumValue}
            value={value}
            step={1}
            onValueChange={onValueChange}
            minimumTrackTintColor={black}
            maximumTrackTintColor={black}
            thumbTintColor={black}/>
                    
</View>
  );
};
