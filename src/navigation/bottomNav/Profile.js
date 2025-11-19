import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MoreIcon from '../../assets/svgs/MoreIcon';
import {TitleBarHeader} from '../../components/TitleBarHeader';
import {appStyle} from '../../theme/AppStyle';
import {black, grey, lightGrey, primaryColor, primaryOrange, white} from '../../theme/Colors';
import {TokenContext} from '../../context/TokenContext';
import BottomSheet from '@gorhom/bottom-sheet';
import ProfileThroCreated from './ProfileThroCreated';

const Profile = () => {
  const images = [
    {id: 1, url: 'https://picsum.photos/200/300'},
    {id: 2, url: 'https://picsum.photos/300/400'},
    {id: 3, url: 'https://picsum.photos/400/500'},
    {id: 4, url: 'https://picsum.photos/500/600'},
  ];

  const renderRow = ({item}) => (
    <Image source={{uri: item.url}} style={styles.image} />
  );

  const {userDetails} = useContext(TokenContext);
  const [fullName, setFullName] = useState(userDetails?.data?.fullName || '');
  console.log('userDetails', JSON.stringify(userDetails));

  const [selectedTab, setSelectedTab] = useState('Details');
  const tabTitles = ['Details', 'Thro Created', 'Thro Caught'];

  useEffect(() => {
    if (userDetails != null || userDetails != undefined) {
      setFullName(userDetails?.data?.fullName);
    }
  }, [userDetails]);

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'Details':
        return (
          <View style={styles.scene}>
            <Text style={[appStyle.textSubHeading, {marginTop: 5}]}>Name</Text>
            <Text style={appStyle.textRegular}>
              {userDetails?.data?.fullName}
            </Text>

            <Text style={[appStyle.textSubHeading, {marginTop: 10}]}>
              About
            </Text>
            <Text style={appStyle.textRegular}>{userDetails?.data?.bio}</Text>

            <Text style={[appStyle.textSubHeading, {marginTop: 10}]}>
              Mobile
            </Text>
            <Text style={appStyle.textRegular}>
              {'+91-' + userDetails?.data?.mobileNo}
            </Text>

            <Text style={[appStyle.textSubHeading, {marginTop: 10}]}>
              Email
            </Text>
            <Text style={appStyle.textRegular}>{userDetails?.data?.email}</Text>

            <FlatList
              style={{marginVertical: 10}}
              data={images}
              horizontal={true}
              renderItem={renderRow}
            />

            <Text style={[appStyle.textSubHeading, {marginTop: 10}]}>
              Gender
            </Text>
            <Text style={appStyle.textRegular}>
              {userDetails?.data?.gender}
            </Text>

            <Text style={[appStyle.textSubHeading, {marginTop: 10}]}>
              Date of Birth
            </Text>
            <Text style={appStyle.textRegular}>{userDetails?.data?.dob}</Text>

            <Text style={[appStyle.textSubHeading, {marginTop: 10}]}>
              Address
            </Text>
            <Text style={appStyle.textRegular}>
              {userDetails?.data?.location?.address}
            </Text>

            <Text style={[appStyle.textSubHeading, {marginTop: 10}]}>
              Interests
            </Text>
            <FlatList
              data={userDetails?.data?.interests}
              style={styles.activityList}
              renderItem={renderActivities}
              horizontal={true}
              ItemSeparatorComponent={<View style={{margin: 5}} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        );
      case 'Thro Created':
        return <ProfileThroCreated />;
      case 'Thro Caught':
        return (
          <Text style={[appStyle.textRegular, {marginTop: 20}]}>
            Thro Caught Content
          </Text>
        );
      default:
        return null;
    }
  };

  const renderActivities = ({item}) => {
    const getActivityStyle = isSelected => ({
      color: isSelected ? primaryOrange : primaryTabGrey,
      fontSize: 15,
      paddingTop: 5,
      paddingBottom: 2,
      paddingHorizontal: 12,
      fontFamily: 'Nunito-Bold',
      borderWidth: 2,
      borderColor: primaryColor,
      borderColor: isSelected ? primaryOrange : primaryTabGrey,
      borderRadius: 20,
    });

    return (
      <TouchableOpacity style={{height: 40}}>
        <Text style={getActivityStyle()}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <TitleBarHeader
        titleBarText={'My Profile'}
        rightIcon={<MoreIcon />}
        onLeftPressed={() => {}}
        elevation={10}
      />

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 40}}
        nestedScrollEnabled={true}>
        {/* Profile Image & Header */}
        <View style={{marginHorizontal: 25, backgroundColor: lightGrey}}>
          <Image
            style={{
              width: '90%',
              alignSelf: 'center',
              aspectRatio: 1,
              marginTop: 20,
            }}
            source={{uri: userDetails?.data?.profilePicture}}
          />

          <View style={{flexDirection: 'row', margin: 20}}>
            <View style={{flex: 2, justifyContent: 'center'}}>
              <Text
                style={{fontFamily: 'Nunito-Bold', fontSize: 17, color: black}}>
                {userDetails?.data?.userName}
              </Text>
            </View>

            <View
              style={{
                width: 100,
                flex: 1.5,
                backgroundColor: primaryOrange,
                height: 55,
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: 10,
              }}>
              <View style={{alignItems: 'center', flex: 1}}>
                <Text style={[appStyle.textHeading, {color: white}]}>0</Text>
                <Text style={[appStyle.textSubHeading, {color: white}]}>
                  Catches
                </Text>
              </View>
              <View style={{height: 40, width: 0.5, backgroundColor: white}} />
              <View style={{alignItems: 'center', flex: 1}}>
                <Text style={[appStyle.textHeading, {color: white}]}>0</Text>
                <Text style={[appStyle.textSubHeading, {color: white}]}>
                  Thros
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tab Bar */}
        <View style={styles.tabBarContainer}>
          {tabTitles.map(title => (
            <TouchableOpacity
              key={title}
              onPress={() => setSelectedTab(title)}
              style={[
                styles.tabButton,
                selectedTab === title && styles.tabButtonActive,
              ]}>
              <Text
                style={[
                  selectedTab === title ? styles.tabActive : styles.tabInActive,
                ]}>
                {title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={{paddingHorizontal: 25}}>{renderTabContent()}</View>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{backgroundColor: white}}
        handleIndicatorStyle={{backgroundColor: grey}}>
        <View style={{padding: 20}}>
          <Text style={appStyle.textSubHeading}>More Options</Text>
          <TouchableOpacity style={{marginTop: 15}}>
            <Text style={appStyle.textRegular}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop: 15}}>
            <Text style={appStyle.textRegular}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop: 15}}>
            <Text style={[appStyle.textRegular, {color: 'red'}]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  scene: {
    marginTop: 5,
  },
  tabBarContainer: {
    flexDirection: 'row',
    marginHorizontal: 25,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: lightGrey,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomColor: primaryOrange,
  },
  tabActive: {
    fontFamily: 'Nunito-Bold',
    color: primaryOrange,
    fontSize: 14,
  },
  tabInActive: {
    fontFamily: 'Nunito-Bold',
    color: grey,
    fontSize: 14,
  },
  activityList: {
    marginTop: 5,
    marginBottom: 10,
  },
  image: {
    width: 120,
    height: 120,
    marginEnd: 5,
  },
});
