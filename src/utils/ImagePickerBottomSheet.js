/* import React, {useRef, useMemo} from 'react';
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ImagePickerBottomSheet = () => {
  const bottomSheetRef = useRef(null);
  const [imageUri, setImageUri] = React.useState(null);

  // Bottom sheet snap points
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // Function to open the image gallery
  const openGallery = () => {
    const options = {mediaType: 'photo'};
    launchImageLibrary(options, response => {
      if (response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
    // Close the bottom sheet
    bottomSheetRef.current?.close();
  };

  // Function to open the camera
  const openCamera = () => {
    const options = {mediaType: 'photo'};
    launchCamera(options, response => {
      if (response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
    // Close the bottom sheet
    bottomSheetRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <Button
        title="Open Bottom Sheet"
        onPress={() => bottomSheetRef.current?.expand()}
      />

      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints}>
        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={openCamera}>
            <Text style={styles.optionText}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={openGallery}>
            <Text style={styles.optionText}>Open Gallery</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  optionButton: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default ImagePickerBottomSheet;
 */
