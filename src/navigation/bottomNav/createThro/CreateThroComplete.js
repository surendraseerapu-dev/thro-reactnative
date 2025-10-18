import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import BackIcon from '../../../assets/svgs/BackIcon';
import CalendarPickerIcon from '../../../assets/svgs/CalendarPickerIcon';
import {DropDown} from '../../../components/DropDown';
import {FilledButton} from '../../../components/FilledButton';
import {InputField} from '../../../components/InputField';
import {LargeInputField} from '../../../components/LargeInputField';
import {TitleBarHeader} from '../../../components/TitleBarHeader';
import {black, grey} from '../../../theme/Colors';
import {
  CREATE_THRO,
  ROUTE_WHAT_A_THRO,
  SESSION_TOKEN,
} from '../../../utils/Constants';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  sendDateToBackend,
  formateDate,
} from '../../../components/DateFormatter';
import {apiCall} from '../../../utils/apicall';
import {ErrorMessageWithDescription} from '../../../utils/FlashMessage';
import {getLocalData} from '../../../utils/LocalStorage';

export default CreateThroComplete = ({route}) => {
  const navigation = useNavigation();
  const {throDetails} = route.params;

  const [gender, setGender] = useState('');
  const genderList = [{name: 'Any'}, {name: 'MALE'}, {name: 'FEMALE'}];

  const [startDate, setStartDate] = useState(null);
  const [cutOffDate, setCutOffDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState(null);

  const [authToken, setAuthToken] = useState('');
  const [openFor, setOpenFor] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getSession();
  }, []);

  const getSession = async () => {
    const token = await getLocalData(SESSION_TOKEN);
    setAuthToken(token);
  };

  const createThro = async () => {
    if (!startDate || !cutOffDate || !endDate) {
      ErrorMessageWithDescription('Missing Info', 'Please select all dates');
      return;
    }
  
    const req = {
      title: throDetails.title,
      description: description,
      startTimestamp: sendDateToBackend(startDate),
      endTimestamp: sendDateToBackend(endDate),
      cutoffTimestamp: sendDateToBackend(cutOffDate),
      activityId: throDetails.activityId,
      subActivityId: throDetails.subActivityId,
      radius: String(throDetails.radius),
      gender: gender.name,
      catchLimit: String(throDetails.catchLimit),
      address: throDetails.address,
      location: {
        lat: throDetails.location.lat,
        long: throDetails.location.long,
      },
    };
    
    const res = await apiCall('POST', CREATE_THRO, req, null, true, authToken);
    
    if (!res.success) {
      ErrorMessageWithDescription('Error', res.response.body);
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{name: ROUTE_WHAT_A_THRO}],
    });
  };

  const handleDateConfirm = date => {
    if (openFor === 'StartDate') {
      setStartDate(date);
    } else if (openFor === 'CutOffDate') {
      setCutOffDate(date);
    } else if (openFor === 'EndDate') {
      setEndDate(date);
    }
    setModalVisible(false);
  };

  return (
    <ScrollView>
      <DateTimePickerModal
        isVisible={modalVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={() => setModalVisible(false)}
      />

      <TitleBarHeader
        leftIcon={<BackIcon />}
        onLeftPressed={() => navigation.goBack()}
        elevation={10}
      />

      <Text
        style={{
          marginTop: -20,
          alignSelf: 'center',
          color: black,
          fontFamily: 'Nunito-ExtraBold',
          fontSize: 30,
        }}>
        Create a Thro
      </Text>

      <Text
        style={{
          marginTop: 10,
          alignSelf: 'center',
          color: grey,
          fontFamily: 'Nunito-Regular',
          fontSize: 15,
          textAlign: 'center',
          marginHorizontal: 30,
        }}>
        What type of folks and when you want to set this event?
      </Text>

      <DropDown
        style={{marginHorizontal: 35, marginTop: '10%'}}
        heading={'Gender Preference'}
        data={genderList}
        value={gender}
        label={'name'}
        selectedValue={setGender}
      />

      <InputField
        style={{marginHorizontal: 35, marginTop: 20}}
        heading={'Start Date & Time'}
        isEditable={false}
        onPress={() => {
          setOpenFor('StartDate');
          setModalVisible(true);
        }}
        value={startDate ? formateDate(startDate) : ''}
        rightIcon={<CalendarPickerIcon />}
      />

      <InputField
        style={{marginHorizontal: 35, marginTop: 20}}
        heading={'Cut-Off Date & Time'}
        isEditable={false}
        onPress={() => {
          setOpenFor('CutOffDate');
          setModalVisible(true);
        }}
        value={cutOffDate ? formateDate(cutOffDate) : ''}
        rightIcon={<CalendarPickerIcon />}
      />

      <InputField
        style={{marginHorizontal: 35, marginTop: 20}}
        heading={'End Date & Time'}
        isEditable={false}
        onPress={() => {
          setOpenFor('EndDate');
          setModalVisible(true);
        }}
        value={endDate ? formateDate(endDate) : ''}
        rightIcon={<CalendarPickerIcon />}
      />

      <LargeInputField
        style={{marginHorizontal: 35, marginTop: 20}}
        heading={'Write a few words describing the event. (optional)'}
        value={description}
        onChangeText={val => setDescription(val)}
      />

      <FilledButton
        style={{marginHorizontal: 30, marginTop: 20, marginBottom: 20}}
        lable={'Continue'}
        onPress={createThro}
      />
    </ScrollView>
  );
};
