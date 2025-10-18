import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, RESULTS} from 'react-native-permissions';
import CheckIcon from '../../assets/svgs/CheckIcon';
import LocationDropIcon from '../../assets/svgs/LocationDropIcon';
import {DropDown} from '../../components/DropDown';
import {FilledButton} from '../../components/FilledButton';
import {InputField} from '../../components/InputField';
import {black, grey} from '../../theme/Colors';
import {APIServiceGETWithQueryParam} from '../../utils/APIService';
import {
  CHECK_EMAIL,
  CHECK_USERNAME,
  ROUTE_PROFILE_SETUP,
} from '../../utils/Constants';
import {ErrorMessageWithDescription} from '../../utils/FlashMessage';
import {checkPermission, requestPermission} from '../../utils/PermissionUtils';
import {apiCall} from '../../utils/apicall';

export default PersonalDetails = ({route}) => {
  const navigation = useNavigation();
  const {mobileNo} = route.params;
  const {authToken} = route.params;
  const [gender, selectedGender] = useState('');
  const [username, setUsername] = useState('');
  const [usernameSuccess, setUsernameSuccess] = useState(false);
  const [usernameSuccessMsg, setUsernameSuccessMsg] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailSuccessMsg, setEmailSuccessMsg] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (username.length > 7 && username.length < 16) {
      setTimeout(() => {
        checkUsername(username);
      }, 500);
    } else {
      setUsernameSuccess(false);
      setUsernameSuccessMsg('');
    }
  }, [username]);

  const categories = [{name: 'MALE'}, {name: 'FEMALE'}];

  const checkUsername = async userName => {
    try {
      const res = await APIServiceGETWithQueryParam(userName, CHECK_USERNAME);
      if (!res.data.includes(userName)) {
        console.log('checkusername', true);
        setUsernameSuccess(true);
        setUsernameSuccessMsg('Username avaliable');
      } else {
        setUsernameSuccess(false);
        setUsernameSuccessMsg('Username unavaliable');
      }
    } catch (error) {
      console.log(error, typeof error);
    }
  };

  const checkEmail = async email => {
    var check;
    try {
      const res = await apiCall('GET', CHECK_EMAIL, null, {email: email});
      if (res.statusCode == 200) {
        console.log(res);
        if (res.data.exist) {
          setEmailSuccess(true);
          setEmailSuccessMsg('Email avaliable');
        }
        check = false;
      } else if (res.statusCode == 400) {
        //console.log('false');
        //  ErrorMessage(res.message);
      }
      check = false;
    } catch (error) {
      console.log(error, typeof error);
      check = false;
    }
    return check;
  };

  const validateForm = () => {
    if (username.length < 8 || username.length > 15) {
      ErrorMessageWithDescription(
        'Invalid Username',
        'Must contain 8-15 characters',
      );
      return;
    }

    if (displayName.length < 3) {
      ErrorMessageWithDescription(
        'Incomplete Display Name',
        'Must contain 3 characters',
      );
      return;
    }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      ErrorMessageWithDescription(
        'Invalid Email Address',
        'Please input a valid email address',
      );
    }
    if (!checkEmail()) {
      return;
    }

    if (password.length < 8 || password.length > 15) {
      ErrorMessageWithDescription(
        'Invalid Password',
        'Must contain 8-15 characters',
      );
      return;
    }

    if (gender == '') {
      ErrorMessageWithDescription(
        'Select Gender',
        'Gender must not left blank',
      );
      return;
    }

    if (dateOfBirth == '') {
      ErrorMessageWithDescription(
        'Select Date of Birth',
        'Date of Birth must not left blank',
      );
      return;
    }

    if (location == '') {
      ErrorMessageWithDescription(
        'Select Location',
        'Location must not left blank',
      );
      return;
    }

    const req = {
      userName: username,
      fullName: displayName,
      email: email,
      password: password,
      gender: gender.name,
      dob: dateOfBirth,
      location: {
        lat: latitude,
        long: longitude,
        address: 'A-1, Block A, Sector 71, Noida, Uttar Pradesh 201301',
      },
    };

    navigation.navigate(ROUTE_PROFILE_SETUP, {
      personalDetails: req,
      authToken: authToken,
    });
  };

  const handleCheckPermission = async () => {
    const result = await checkPermission(
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ); // Use appropriate permission
    console.log('Camera Permission Status:', result);
    handleRequestPermission();
  };

  const handleRequestPermission = async () => {
    const result = await requestPermission(
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ); // Use appropriate permission
    if (result === RESULTS.GRANTED) {
      getLocation();
    } else if (result === RESULTS.DENIED) {
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
        setLocation(latitude + ',' + longitude);
        //console.log(location);

        // getAddressFromLatLong(28.594594594594593, 77.38470265859395);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <ScrollView>
      <View>
        <Text
          style={{
            marginTop: '10%',
            alignSelf: 'center',
            color: black,
            fontFamily: 'Nunito-ExtraBold',
            fontSize: 30,
          }}>
          Personal Details
        </Text>

        <Text
          style={{
            marginTop: 10,
            alignSelf: 'center',
            color: grey,
            fontFamily: 'Nunito-Regular',
            fontSize: 15,
          }}>
          Tell a bit about yourself
        </Text>

        <InputField
          style={{marginHorizontal: 35, marginTop: '10%'}}
          heading={'Username'}
          value={username}
          onChangeText={value => setUsername(value)}
          placeholder={'A unique name must contain 8-15 characters'}
          inputMode={'text'}
          success={usernameSuccess}
          successMsg={usernameSuccessMsg}
          rightIcon={<CheckIcon />}
        />

        <InputField
          style={{marginHorizontal: 35, marginTop: 20}}
          heading={'Display Name'}
          value={displayName}
          onChangeText={value => setDisplayName(value)}
          placeholder={'A name will show others'}
          inputMode={'text'}
        />

        <InputField
          style={{marginHorizontal: 35, marginTop: 20}}
          heading={'Email'}
          inputMode={'email'}
          value={email}
          onChangeText={value => setEmail(value)}
          success={emailSuccess}
          successMsg={emailSuccessMsg}
          placeholder={'email@thro.com'}
        />

        <InputField
          style={{marginHorizontal: 35, marginTop: 20}}
          heading={'Password'}
          inputMode={'password'}
          value={password}
          onChangeText={value => setPassword(value)}
          placeholder={'Set a 8-15 character stong password'}
        />

        <DropDown
          style={{marginHorizontal: 35, marginTop: 20}}
          heading={'Gender Prefrence'}
          data={categories}
          label={'name'}
          value={gender}
          selectedValue={value => {
            selectedGender(value);
          }}
        />

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

        <DatePicker
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
        />

        <InputField
          style={{marginHorizontal: 35, marginTop: 20}}
          heading={'Location'}
          isEditable={false}
          value={location}
          onPress={() => {
            handleCheckPermission();
          }}
          inputMode={'numeric'}
          //onChangeText={value => setLocation(value)}
          rightIcon={<LocationDropIcon />}
        />

        <FilledButton
          style={{marginVertical: '10%', marginHorizontal: 30}}
          lable={'Continue'}
          onPress={() => {
            validateForm();
          }}
        />
      </View>
    </ScrollView>
  );
};
