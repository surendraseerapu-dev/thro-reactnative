import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { primaryColor, white } from '../theme/Colors';

export const BorderedButton = ({style,lable,onPress}) => {
  
  return (
    <View style={style}>
        <TouchableOpacity
            onPress={onPress} 
            style={{backgroundColor:white,
                    height:50,
                    borderRadius:30,
                    borderWidth:2,
                    borderColor:primaryColor,
                    alignItems:'center',
                    justifyContent:'center'}}>
            <Text style={{color:primaryColor, fontFamily:'Nunito-ExtraBold',fontSize:18}}> 
                {lable}
            </Text>
        </TouchableOpacity>
    </View>
  );
};


