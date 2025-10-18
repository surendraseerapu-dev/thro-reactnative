import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {PERMISSIONS, RESULTS} from 'react-native-permissions';
import {FilledButton} from '../../components/FilledButton';
import {LargeInputField} from '../../components/LargeInputField';
import {black, grey, primaryColor} from '../../theme/Colors';
import {APIServicePOSTWithSession} from '../../utils/APIService';
import {
  COMPLETE_PERSONAL_DETAILS,
  ROUTE_CHOOSE_INTERESTS,
  USER_SESSION_FOR_SIGNUP,
} from '../../utils/Constants';
import {
  ErrorMessage,
  ErrorMessageWithDescription,
  SuccessMessage,
} from '../../utils/FlashMessage';
import {getLocalData} from '../../utils/LocalStorage';
import {checkPermission, requestPermission} from '../../utils/PermissionUtils';
import {apiCall} from '../../utils/apicall';

export default ProfileSetup = ({route}) => {
  const {personalDetails} = route.params;
  const authToken = route.params;
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [bio, setBio] = useState('');
  const [profileURL, setProfileURL] = useState(undefined);

  const bottomSheetRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand(); // Opens the bottom sheet
  };

  // Open Image Library
  const openGallery = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);
      }
    });
  };

  const handleCheckPermission = async () => {
    const result = await checkPermission(PERMISSIONS.ANDROID.CAMERA); // Use appropriate permission
    console.log('Camera Permission Status:', result);
    handleRequestPermission();
  };

  const handleRequestPermission = async () => {
    const result = await requestPermission(PERMISSIONS.ANDROID.CAMERA); // Use appropriate permission
    if (result === RESULTS.GRANTED) {
      openCamera();
    } else if (result === RESULTS.DENIED) {
    } else if (result === RESULTS.BLOCKED) {
      Linking.openSettings();
    }
  };

  // Open Camera
  const openCamera = () => {
    const options = {
      mediaType: 'photo',
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        compressImage(uri);
      }
    });
  };

  const compressImage = async uri => {
    try {
      const compressedImage = await ImageResizer.createResizedImage(
        uri,
        800, // width
        600, // height
        'JPEG', // format (JPEG/PNG)
        25, // quality (0-100)
        0, // rotation (0 if no rotation needed)
        undefined, // output path (undefined will use the cache directory)
        false, // true to allow to resize the image with a larger size than the original
      );

      setPhoto(compressedImage.uri); // Set the compressed image URI
      uploadImage(compressedImage.uri);
    } catch (err) {
      console.error(err);
    }
  };

  const uploadImage = async photo => {
    if (!photo) {
      console.log('No photo to upload');
      return;
    }

    const formData = new FormData();
    formData.append('picture', {
      uri: Platform.OS === 'android' ? photo : photo.replace('file://', ''),
      type: 'image/jpeg', // You can adjust this depending on the image type (png, jpg, etc.)
      name: `${personalDetails.userName}` + '.jpg',
    });
    formData.append('pictureName', 'profile'); // Add the pictureName key

    try {
      const response = await fetch(
        'http://ec2-13-60-34-131.eu-north-1.compute.amazonaws.com:4002/v1/user/uploadPicture',
        {
          method: 'PATCH',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json', // Accept JSON in response
          },
        },
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Upload successful', jsonResponse);
        setProfileURL(jsonResponse.data.fileS3Url);
        SuccessMessage('Profile image successfully uploaded');
      } else {
        ErrorMessageWithDescription(
          'Image Upload Failed',
          'Failed to upload image, please try again',
        );
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Upload error');
      ErrorMessageWithDescription(
        'Network Error',
        'Failed to upload image, please try again',
      );
    }
  };

  const validateForm = async () => {
    if (profileURL == undefined) {
      ErrorMessageWithDescription(
        'No Profile Found',
        'Please Upload a image to proceed',
      );
      return;
    }
    if (bio.length < 20) {
      ErrorMessageWithDescription(
        'Incomplete Bio',
        'Bio atleast contain 20 characters',
      );
      return;
    }
    personalDetails.profilePicture = profileURL;
    personalDetails.bio = bio;

    console.log('personalDetails', personalDetails);
    console.log('authToken', authToken);

    const res = await apiCall(
      'PATCH',
      COMPLETE_PERSONAL_DETAILS,
      personalDetails,
      null,
      true,
      authToken.authToken,
    );
    try {
      if (res.statusCode == 200) {
        navigation.navigate(ROUTE_CHOOSE_INTERESTS);
      } else {
        ErrorMessage(res.message);
      }
    } catch (error) {
      console.log(error, typeof error);
    }
  };

  return (
    <ScrollView>
      <Text
        style={{
          marginTop: '10%',
          alignSelf: 'center',
          color: black,
          fontFamily: 'Nunito-ExtraBold',
          fontSize: 30,
        }}>
        Profile Setup
      </Text>

      <Text
        style={{
          marginTop: 10,
          alignSelf: 'center',
          color: grey,
          fontFamily: 'Nunito-Regular',
          fontSize: 15,
        }}>
        What do you look like?
      </Text>

      <TouchableOpacity
        onPress={() => {
          handleCheckPermission();
        }}>
        {imageUri == null ? (
          <Image
            style={{
              height: 200,
              width: 200,
              borderRadius: 100,
              alignSelf: 'center',
              marginTop: '20%',
            }}
            source={require('../../assets/images/upload_image_holder.png')}
          />
        ) : profileURL == undefined ? (
          <ActivityIndicator
            size={150}
            color={primaryColor}
            style={{
              marginTop: '20%',
            }}></ActivityIndicator>
        ) : (
          <Image
            style={{
              height: 200,
              width: 200,
              borderRadius: 100,
              alignSelf: 'center',
              marginTop: '20%',
            }}
            source={{uri: profileURL}}
          />
        )}
      </TouchableOpacity>

      <LargeInputField
        style={{marginHorizontal: 35, marginTop: '15%'}}
        value={bio}
        onChangeText={val => setBio(val)}
        heading={'Write a few words describing the event. (optional)'}
      />

      <FilledButton
        style={{marginVertical: '20%', marginHorizontal: 30}}
        lable={'Continue'}
        onPress={() => {
          //navigation.navigate('ChooseInterests');
          validateForm();
        }}
      />
    </ScrollView>
  );
};
