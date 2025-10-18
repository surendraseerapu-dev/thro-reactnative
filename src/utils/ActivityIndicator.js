// ActivityIndicatorComponent.js
import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import {headingColor, primaryColor, white} from '../theme/Colors';

// A customizable ActivityIndicator component inside a Modal
const ActivityIndicatorComponent = ({
  visible = false,
  size = 'large',
  color = primaryColor,
  text = 'Loading...',
  onClose = () => {},
  containerStyle = {},
  textStyle = {},
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={[styles.overlay, containerStyle]}>
        <View style={styles.modalContent}>
          <ActivityIndicator size={size} color={color} />
          {text ? <Text style={[styles.text, textStyle]}>{text}</Text> : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay
  },
  modalContent: {
    backgroundColor: white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: headingColor,
  },
});

export default ActivityIndicatorComponent;
