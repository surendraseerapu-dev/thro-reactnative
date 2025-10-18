import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FilledButton} from './FilledButton';
import {BorderedButton} from './BorderedButton';
import {headingColor, subHeadingColor} from '../theme/Colors';
import {Image} from 'react-native-svg';
import ThroIcon from '../assets/svgs/ThroIcon';

const CustomPopup = ({
  visible,
  title,
  message,
  onAccept,
  onDecline,
  acceptText = 'Accept',
  declineText = 'Decline',
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.popup]}>
          <ThroIcon></ThroIcon>
          {title && <Text style={[styles.title]}>{title}</Text>}
          {message && <Text style={[styles.message]}>{message}</Text>}
          <View style={styles.buttonContainer}>
            <FilledButton
              style={{flex: 1}}
              lable={acceptText}
              onPress={onAccept}
            />
            <View style={{marginHorizontal: 5}} />
            <BorderedButton
              style={{flex: 1}}
              lable={declineText}
              onPress={onDecline}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 17,
    fontFamily: 'Nunito-ExtraBold',
    color: headingColor,
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    fontFamily: 'Nunito-ExtraBold',
    color: subHeadingColor,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 40,
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  declineButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomPopup;
