// GooglePlaceInput.js
import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {black, green, grey, red, white} from '../theme/Colors';
import {appStyle} from '../theme/AppStyle';
import {GOOGLE_PLACE_API_KEY} from '../utils/Constants';

export const GooglePlaceInput = ({
  style,
  heading,
  placeholder,
  onPlaceSelected,
  error,
  errorMsg,
  success,
  successMsg,
  rightIcon,
}) => {
  return (
    <View style={style}>
      {heading && <Text style={[appStyle.textSubHeading]}>{heading}</Text>}

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <GooglePlacesAutocomplete
          placeholder={placeholder}
          fetchDetails
          enablePoweredByContainer={false}
          disableScroll
          listViewProps={{
            nestedScrollEnabled: true,
          }}
          query={{key: GOOGLE_PLACE_API_KEY, language: 'en'}}
          onPress={(data, details = null) => {
            const loc = details?.geometry?.location;
            onPlaceSelected?.(data.description, loc);
          }}
          styles={{
            textInput: [
              appStyle.textRegular,
              {
                marginStart: -5,
                width: '90%',
                borderWidth: 0,
                padding: 0,
              },
            ],
            textInputContainer: [
              {
                flex: 1,
                marginStart: -5,
                backgroundColor: 'transparent',
                borderBottomWidth: 1,
                borderBottomColor: grey,
              },
            ],
            /* ③ keep the suggestion list above everything */
            listView: {
              backgroundColor: white,
              elevation: 3, // Android
              zIndex: 999, // iOS
              marginTop: Platform.OS === 'ios' ? 5 : -10,
            },
            separator: {height: 0.5, backgroundColor: grey},
            row: {paddingHorizontal: 10, paddingVertical: 12},
            description: {color: black},
          }}
        />

        {rightIcon && (
          <TouchableOpacity style={{position: 'absolute', right: 0}}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text style={[appStyle.textRegular, {color: red, marginTop: 3}]}>
          {errorMsg}
        </Text>
      )}

      {success && (
        <Text style={[appStyle.textRegular, {color: green, marginTop: 3}]}>
          {successMsg}
        </Text>
      )}
    </View>
  );
};
