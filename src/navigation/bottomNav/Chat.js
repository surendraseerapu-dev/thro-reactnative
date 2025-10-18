import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MoreIcon from '../../assets/svgs/MoreIcon';
import {TitleBarHeader} from '../../components/TitleBarHeader';
import {
  headingColor,
  primaryColor,
  subHeadingColor,
  white,
} from '../../theme/Colors';
import {ACTIVITY, ROUTE_GROUP_CHAT} from '../../utils/Constants';
import {useNavigation} from '@react-navigation/native';
import {FilledButton} from '../../components/FilledButton';

const chatTypes = [
  {name: 'All'},
  {name: 'Created by you'},
  {name: 'Created by others'},
];

const Chat = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigation = useNavigation();

  const renderActivities = ({item, index}) => {
    // Helper function to determine style for selected activities
    const getActivityStyle = isSelected => ({
      color: isSelected ? white : primaryColor,
      fontSize: 15,
      paddingTop: 5,
      paddingBottom: 2,
      paddingHorizontal: 12,
      fontFamily: 'Nunito-Bold',
      borderWidth: 2,
      borderColor: primaryColor,
      backgroundColor: isSelected ? primaryColor : white,
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

  const renderChats = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ROUTE_GROUP_CHAT);
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{alignItems: 'center', width: '30%'}}>
              <Image
                style={styles.profileImage}
                source={{
                  uri: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
                }}
              />
            </View>

            <View style={styles.throDetails}>
              <Text style={styles.textHeading}>
                {'Event name belongs here'}
              </Text>
              <Text style={styles.textRegular}>{'5 participants'}</Text>

              <View style={{alignSelf: 'flex-end'}}>
                <FilledButton
                  //   onPress={() => setPopupVisible(true)}
                  lable={'Reply'}
                  height={25}
                  width={60}
                  fontSize={14}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [navigation],
  );
  return (
    <SafeAreaView style={{height: '100%', backgroundColor: white}}>
      <TitleBarHeader
        // leftIcon={<BackIcon />}
        titleBarText={'Chats'}
        // rightIcon={<MoreIcon />}
        onLeftPressed={() => {}}
        elevation={10}
      />

      <View>
        <FlatList
          data={chatTypes}
          style={styles.activityList}
          renderItem={renderActivities}
          horizontal={true}
          ItemSeparatorComponent={<View style={{margin: 5}} />}
          keyExtractor={(item, index) => index.toString()}
          extraData={selectedIndex}
        />
      </View>

      <FlatList
        data={chatTypes}
        style={{marginEnd: 20}}
        renderItem={renderChats}
        ItemSeparatorComponent={
          <View
            style={{
              marginVertical: 5,
              backgroundColor: primaryColor,
              height: 0.7,
              marginStart: 20,
            }}
          />
        }
        keyExtractor={(item, index) => index.toString()}
        extraData={selectedIndex}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  activityList: {
    marginHorizontal: 25,
    marginBottom: 10,
  },
  profileImage: {
    height: 80,
    aspectRatio: 1,
    borderRadius: 40,
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
  throDetails: {
    width: '70%',
    backgroundColor: white,
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});

export default Chat;
