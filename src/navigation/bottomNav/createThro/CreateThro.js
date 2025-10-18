import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {Linking, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, RESULTS} from 'react-native-permissions';

import BackIcon from '../../../assets/svgs/BackIcon';
import LocationDropIcon from '../../../assets/svgs/LocationDropIcon';
import {DropDown} from '../../../components/DropDown';
import {InputField} from '../../../components/InputField';
import {SeekSlider} from '../../../components/SeekSlider';
import {TitleBarHeader} from '../../../components/TitleBarHeader';
import {FilledButton} from '../../../components/FilledButton';
import {GooglePlaceInput} from '../../../components/GooglePlaceInput';

import {black, grey, white} from '../../../theme/Colors';

import {
  CREATE_THRO_COMPLETE,
  GET_INTERESTS,
  GET_SUB_INTERESTS,
  ROUTE_CREATE_THRO_COMPLETE,
} from '../../../utils/Constants';

import {
  checkPermission,
  requestPermission,
} from '../../../utils/PermissionUtils';
import {ErrorMessageWithDescription} from '../../../utils/FlashMessage';
import {APIServiceGET, APIServicePOST} from '../../../utils/APIService';

export default CreateThro = () => {
  const navigation = useNavigation();

  const [selectedActvity, setSelectedActvity] = useState('');
  const [selectedSubActivity, setSelectedSubActivity] = useState('');
  const [eventHeading, setEventHeading] = useState('');
  const [kms, setKms] = useState(15);
  const [catches, setCatches] = useState(5);
  const [activities, setActivities] = useState([]);
  const [subActivities, setSubActivities] = useState([]);
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    getInterests();
    handleCheckPermission();
  }, []);

  const getInterests = async () => {
    const res = await APIServiceGET(GET_INTERESTS);
    setActivities(res.data.data);
  };

  const getSubInterests = async interestId => {
    const res = await APIServicePOST(
      {interestIds: [interestId]},
      GET_SUB_INTERESTS,
    );
    setSelectedActvity(interestId);
    setSubActivities(res.data);
  };

  const validateForm = () => {
    if (!selectedActvity) {
      return ErrorMessageWithDescription(
        'Select Activity',
        'Please select an activity',
      );
    }

    if (!selectedSubActivity) {
      return ErrorMessageWithDescription(
        'Select SubActivity',
        'Please select a sub activity',
      );
    }

    if (!eventHeading) {
      return ErrorMessageWithDescription(
        'Event Heading',
        'Enter a name that will show an event',
      );
    }

    const throDetails = {
      location: {
        lat: latitude,
        long: longitude,
      },
      address: location,
      activityId: selectedActvity,
      subActivityId: selectedSubActivity,
      radius: kms,
      catchLimit: catches,
      title: eventHeading,
    };

    navigation.navigate(ROUTE_CREATE_THRO_COMPLETE, {throDetails});
  };

  const handleCheckPermission = async () => {
    const result = await checkPermission(
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
    handleRequestPermission();
  };

  const handleRequestPermission = async () => {
    const result = await requestPermission(
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
    if (result === RESULTS.GRANTED) {
      getLocation();
    } else if (result === RESULTS.BLOCKED) {
      Linking.openSettings();
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        setLocation(`${latitude},${longitude}`);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <KeyboardAwareScrollView
        extraScrollHeight={100}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <TitleBarHeader
          leftIcon={<BackIcon />}
          onLeftPressed={() => navigation.goBack()}
          elevation={10}
        />

        <Text style={styles.title}>Create a Thro</Text>
        <Text style={styles.subtitle}>What type of Activity is it?</Text>

        <DropDown
          style={{marginHorizontal: 35, marginTop: '10%'}}
          heading={'Activity'}
          data={activities}
          value={activities.find(a => a._id === selectedActvity) || null}
          label={'name'}
          selectedValue={value => {
            setSelectedActvity(value._id);
            getSubInterests(value._id);
          }}
        />

        <DropDown
          style={{marginHorizontal: 35, marginTop: 20}}
          heading={'Sub Activity'}
          data={subActivities}
          value={subActivities.find(a => a._id === selectedSubActivity) || null}
          label={'name'}
          selectedValue={value => {
            setSelectedSubActivity(value._id);
          }}
        />

        <InputField
          style={{marginHorizontal: 35, marginTop: 20}}
          heading={'Event Heading'}
          value={eventHeading}
          onChangeText={val => setEventHeading(val)}
          placeholder={'Event name can have 15-20 letters long'}
          inputMode={'text'}
        />

        <GooglePlaceInput
          style={{marginHorizontal: 35, marginTop: 20}}
          heading={'Location'}
          placeholder={'Search for location'}
          listViewProps={{nestedScrollEnabled: true}}
          onPlaceSelected={(description, loc) => {
            setLocation(description);
            setLatitude(loc?.lat);
            setLongitude(loc?.lng);
          }}
        />

        <SeekSlider
          heading={'Radius'}
          value={kms}
          onValueChange={setKms}
          minimumValue={2}
          maximumValue={20}
          subheading={`People within ${kms} kms can catch`}
          style={{marginHorizontal: 35, marginTop: 20}}
        />

        <SeekSlider
          heading={'No of Catches'}
          value={catches}
          minimumValue={0}
          maximumValue={10}
          onValueChange={setCatches}
          subheading={`Maximum ${catches} people can catch`}
          style={{marginHorizontal: 35}}
        />

        <FilledButton
          style={{marginHorizontal: 30, marginTop: 20, marginBottom: 40}}
          lable={'Continue'}
          onPress={validateForm}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: -20,
    alignSelf: 'center',
    color: black,
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 30,
  },
  subtitle: {
    marginTop: 10,
    alignSelf: 'center',
    color: grey,
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
  },
});
