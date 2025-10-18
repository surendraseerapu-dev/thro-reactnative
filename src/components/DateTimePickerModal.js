import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import {Button} from 'react-native-paper';

const DateTimePickerModal = ({isVisible, onClose, onConfirm}) => {
  const [date, setDate] = useState(new Date());

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        <Text style={styles.title}>Pick a Date & Time</Text>
        <DatePicker
          date={date}
          onDateChange={setDate}
          mode="datetime"
          textColor="#000"
        />
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={() => onConfirm(date)}>
            Confirm
          </Button>
          <Button mode="outlined" onPress={onClose}>
            Cancel
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '100%',
  },
});

export default DateTimePickerModal;
