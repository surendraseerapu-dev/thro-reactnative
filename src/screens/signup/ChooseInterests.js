import {CommonActions, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FilledButton} from '../../components/FilledButton';
import {
  black,
  grey,
  primaryColor,
  transparent,
  white,
} from '../../theme/Colors';
import {APIServiceGET, APIServicePOSTWithSession} from '../../utils/APIService';
import {
  CHOOSE_INTERESTS,
  GET_INTERESTS,
  ROUTE_SIGN_IN,
  USER_SESSION_FOR_SIGNUP,
} from '../../utils/Constants';
import {
  ErrorMessage,
  ErrorMessageWithDescription,
} from '../../utils/FlashMessage';
import {getLocalData} from '../../utils/LocalStorage';
import {apiCall} from '../../utils/apicall';

export default PersonalDetails = () => {
  const navigation = useNavigation();
  const [activities, setActivities] = useState([]);
  const [authToken, setAuthToken] = useState('');
  const [selectedChips, setSelectedChips] = useState([]);

  useEffect(() => {
    getInterests();
    getSession();
  }, []);

  const getSession = async () => {
    await getLocalData(USER_SESSION_FOR_SIGNUP).then(res => {
      setAuthToken(res);
    });
  };

  const completeProfile = async () => {
    if (selectedChips.length == 0) {
      ErrorMessageWithDescription(
        'Choose Interests',
        'At least choose one interest',
      );
      return;
    } else {
      const res = await apiCall(
        'POST',
        CHOOSE_INTERESTS,
        {interests: selectedChips},
        null,
        true,
        authToken,
      );
      if (res.statusCode == 200) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: ROUTE_SIGN_IN}],
          }),
        );
      } else {
        ErrorMessage(res.message);
      }
    }
  };

  const getInterests = async () => {
    const res = await APIServiceGET(GET_INTERESTS);
    setActivities(res.data.data);
  };

  // Function to handle chip press
  const toggleChip = _id => {
    if (selectedChips.includes(_id)) {
      // If the chip is already selected, remove it from the selection
      setSelectedChips(selectedChips.filter(chipId => chipId !== _id));
    } else {
      // Otherwise, add the chip to the selection
      setSelectedChips([...selectedChips, _id]);
    }
  };

  return (
    <View style={{height: '100%', width: '100%'}}>
      <Text
        style={{
          marginTop: '10%',
          alignSelf: 'center',
          color: black,
          fontFamily: 'Nunito-ExtraBold',
          fontSize: 30,
        }}>
        Choose Interests
      </Text>

      <Text
        style={{
          marginTop: 10,
          alignSelf: 'center',
          color: grey,
          fontFamily: 'Nunito-Regular',
          fontSize: 15,
        }}>
        What gets you excited?
      </Text>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.chipContainer}>
          {activities.map(item => {
            const isSelected = selectedChips.includes(item._id);
            return (
              <TouchableOpacity
                key={item.name}
                style={[
                  isSelected ? styles.selectedChip : styles.unSelectedChip,
                ]}
                onPress={() => {
                  toggleChip(item._id);
                }} // Toggle the chip selection
              >
                <Text
                  style={[
                    isSelected
                      ? styles.selectChipText
                      : styles.unSelectedChipText,
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 1, width: '100%'}}>
        <FilledButton
          style={{marginVertical: '20%', marginHorizontal: 30}}
          lable={'Continue'}
          onPress={() => {
            completeProfile();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -100,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Enables wrapping of items
    justifyContent: 'center', // Centers the chips
    margin: 10,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5, // Spacing between chips
  },
  selectChipText: {
    color: white,
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  unSelectedChipText: {
    color: primaryColor,
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  selectedChip: {
    borderWidth: 1.5,
    borderColor: primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: primaryColor,
    margin: 5, // Spacing between chips
  },
  unSelectedChip: {
    borderWidth: 1.5,
    borderColor: primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: transparent,
    margin: 5, // Spacing between chips
  },
});
