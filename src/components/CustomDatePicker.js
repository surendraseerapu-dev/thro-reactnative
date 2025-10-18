import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {primaryColor, white} from '../theme/Colors';
import {InputField} from './InputField';
import DatePicker from 'react-native-date-picker';
import CalendarPickerIcon from '../assets/svgs/CalendarPickerIcon';

export const CustomDatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <View>
      <InputField
        style={{marginHorizontal: 35, marginTop: 20}}
        heading={'Date of Birth'}
        isEditable={false}
        onPress={() => {
          setOpen(true);
        }}
        value={dateOfBirth}
        rightIcon={<CalendarPickerIcon />}
      />

      {/*  <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        maximumDate={new Date('2005-01-01')}
        minimumDate={new Date('1970-01-01')}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          setDateOfBirth(moment(date).format('DD/MM/YYYY'));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      /> */}
    </View>
  );
};
