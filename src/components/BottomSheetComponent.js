// BottomSheetComponent.js

import React, {useMemo, useCallback, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import BottomSheet, {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';

const BottomSheetComponent = ({isOpen, onClose, content}) => {
  // Bottom Sheet Reference
  const bottomSheetRef = React.useRef(null);

  // Snap Points for the bottom sheet
  const snapPoints = useMemo(() => ['50%', '10%'], []);

  // Handle opening or closing based on the isOpen prop
  const handleSheetChanges = useCallback(
    index => {
      if (index === 1) onClose(); // Close the sheet when collapsed
    },
    [onClose],
  );

  React.useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand(); // Expand the bottom sheet when `isOpen` is true
    } else {
      bottomSheetRef.current?.collapse(); // Collapse the bottom sheet when `isOpen` is false
    }
  }, [isOpen]);

  return (
    <BottomSheetModalProvider>
      <BottomSheet
        ref={bottomSheetRef}
        index={isOpen ? 0 : 1} // Start expanded if `isOpen` is true
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleIndicatorStyle={styles.handleIndicator}>
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Bottom Sheet</Text>
          <Text style={styles.panelSubtitle}>{content}</Text>
          <Button title="Close" onPress={onClose} />
        </View>
      </BottomSheet>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  panel: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  panelSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  handleIndicator: {
    backgroundColor: '#000',
    width: 50,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
  },
});

export default BottomSheetComponent;
