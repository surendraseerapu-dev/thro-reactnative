import React from 'react';
import {ImageBackground, TextInput, TouchableOpacity, View} from 'react-native';

import { Text } from 'react-native';
import { black } from '../theme/Colors';
export const TitleBarHeader = ({titleBarText,leftIcon,rightIcon,onLeftPressed,onRightPressed}) => {
  
  return (

  <View style={{marginVertical:15,
          marginHorizontal:20, 
          height:'5%',
          flexDirection:'row',
          width:'90%',
          justifyContent:'space-between',
          alignItems:'center'}}>
      
      <TouchableOpacity onPress={onLeftPressed} >
        {leftIcon}
      </TouchableOpacity>

      <Text style={{color:black,fontFamily:'Nunito-ExtraBold',fontSize:18}}>{titleBarText}</Text>

      <TouchableOpacity onPress={onRightPressed}>
        {rightIcon}
      </TouchableOpacity>

      </View>
  );
};
