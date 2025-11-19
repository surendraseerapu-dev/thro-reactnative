import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useContext, useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import CatchIcon from '../../assets/svgs/CatchIcon';
import FilterIcon from '../../assets/svgs/FilterIcon';
import LocationIcon from '../../assets/svgs/LocationIcon';
import ThroIcon from '../../assets/svgs/ThroIcon';
import CustomPopup from '../../components/CustomPopUp';
import {FilledButton} from '../../components/FilledButton';
import {TitleBarHeader} from '../../components/TitleBarHeader';
import {
  headingColor,
  primaryColor,
  primaryOrange,
  primaryTabGrey,
  red,
  subHeadingColor,
  white,
} from '../../theme/Colors';
import {
  ACTIVITY,
  BASE_URL,
  GET_INTERESTS,
  GET_THROS,
  ROUTE_FILTER_THRO,
  ROUTE_THRO_DETAILS,
  SESSION_TOKEN,
} from '../../utils/Constants';
import NetworkService from '../../utils/NetworkService';
import {formateDate} from '../../components/DateFormatter';
import {TokenContext} from '../../context/TokenContext';
import {APIServiceGET} from '../../utils/APIService';

const Dashboard = () => {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [throData, setThroData] = useState([]);
  const [fcmToken, setFcmToken] = useState('');
  const {userDetails, sessionToken, setInterests} = useContext(TokenContext);

  // Fetch Thro Events only if sessionToken changes or when the component mounts
  useEffect(() => {
    getInterests();

    if (sessionToken) {
      getThroEvents(sessionToken);
    }
  }, [sessionToken]);

  const getInterests = async () => {
    const res = await APIServiceGET(GET_INTERESTS);
    setInterests(res.data.data);
    console.log(res);
  };

  const handleAccept = () => {
    console.log('Accepted');
    setPopupVisible(false);
  };

  const handleDecline = () => {
    console.log('Declined');
    setPopupVisible(false);
  };

  const queryParams = {
    page: 1,
    limit: 10,
    include: 0, //0(Others), 1(Only My), 2(All)
  };

  // Fetch Thro events based on sessionToken
  const getThroEvents = async token => {
    try {
      const data = await NetworkService.get(
        BASE_URL + GET_THROS,
        queryParams,
        token,
      );
      setThroData(data.data.data);
    } catch (error) {
      console.error('Error fetching Thro events:', error);
    }
  };

  const renderItemThro = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            navigation.navigate(ROUTE_THRO_DETAILS, {throDetails: item});
          }}>
          <View style={{flex: 3, alignItems: 'center'}}>
            <Image
              style={styles.profileImage}
              source={{uri: item.creator.profilePicture}}
            />
            <Text style={styles.username}>{item.creator.userName}</Text>
            <Rating
              readonly={true}
              ratingColor={primaryColor}
              imageSize={16}
              ratingCount={5}
              startingValue={3}
            />
          </View>

          <View style={styles.throDetails}>
            <Text style={styles.textHeading}>
              {item.activity + ' - ' + item.title}
            </Text>
            <Text
              numberOfLines={2}
              style={[styles.textRegular, {marginTop: 2}]}>
              {item.address}
            </Text>
            <View style={styles.timestampContainer}>
              <Text style={styles.textSubHeading}>
                {formateDate(item.startTimestamp)}
              </Text>
            </View>
            <View style={styles.catchContainer}>
              <FilledButton
                onPress={() => setPopupVisible(true)}
                lable={'Catch'}
                height={30}
                width={80}
              />
              <View style={styles.catchCountContainer}>
                <View style={styles.iconTextContainer}>
                  <CatchIcon />
                  <Text style={styles.textRegular}> {item.catchSentCount}</Text>
                </View>
                <View style={styles.iconTextContainer}>
                  <ThroIcon />
                  <Text style={styles.textRegular}>
                    {item.catchAcceptedCount}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  const renderActivities = ({item, index}) => {
    // Helper function to determine style for selected activities
    const getActivityStyle = isSelected => ({
      color: isSelected ? primaryOrange : primaryTabGrey,
      fontSize: 16,
      paddingTop: 10,
      paddingBottom: 10,
      paddingHorizontal: 20,
      fontFamily: 'Nunito-Bold',
      borderWidth: 2,
      borderColor: isSelected ? primaryOrange : primaryTabGrey,
      backgroundColor: white,
      borderRadius: 20,
    });

    return (
      <TouchableOpacity
        style={{height: 40}}
        onPress={() => setSelectedIndex(index)}>
        <Text style={getActivityStyle(index === selectedIndex)}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TitleBarHeader
        leftIcon={<LocationIcon />}
        titleBarText={'Thros'}
        rightIcon={<FilterIcon />}
        onLeftPressed={() => {}}
        onRightPressed={() => {
          navigation.navigate(ROUTE_FILTER_THRO);
        }}
        elevation={10}
      />

      <FlatList
        data={ACTIVITY}
        style={styles.activityList}
        renderItem={renderActivities}
        horizontal={true}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={<View style={{margin: 5}} />}
        keyExtractor={(item, index) => index.toString()}
        extraData={selectedIndex}
      />

      <CustomPopup
        visible={popupVisible}
        message="Are you sure you want to catch this thro?"
        onAccept={handleAccept}
        onDecline={handleDecline}
        acceptText="Yes"
        declineText="No"
      />

      <FlatList
        data={throData}
        renderItem={renderItemThro}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: white,
  },
  item: {
    paddingVertical: 5,
    flexDirection: 'row',
    marginVertical: 8,
  },
  profileImage: {
    height: 80,
    aspectRatio: 1,
    borderRadius: 40,
  },
  username: {
    color: headingColor,
    fontSize: 13,
    fontFamily: 'Nunito-Medium',
  },
  throDetails: {
    flex: 7,
    backgroundColor: white,
    alignSelf: 'center',
  },
  textHeading: {
    fontSize: 17,
    fontFamily: 'Nunito-ExtraBold',
    color: headingColor,
  },
  textSubHeading: {
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
    color: headingColor,
  },
  textRegular: {
    fontSize: 13,
    fontFamily: 'Nunito-Regular',
    color: subHeadingColor,
  },
  catchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  catchCountContainer: {
    marginEnd: 20,
    flexDirection: 'row',
  },
  iconTextContainer: {
    flexDirection: 'row',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  activityList: {
    marginHorizontal: 25,
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
});

export default Dashboard;
