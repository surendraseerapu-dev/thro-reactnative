import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import NetworkService from '../../utils/NetworkService';
import {BASE_URL, GET_THROS} from '../../utils/Constants';
import {useCallback, useContext, useEffect, useState} from 'react';
import {TokenContext} from '../../context/TokenContext';
import {
  grey,
  headingColor,
  lightGrey,
  primaryColor,
  subHeadingColor,
  white,
} from '../../theme/Colors';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {Rating} from 'react-native-ratings';
import {formateDate} from '../../components/DateFormatter';
import {FilledButton} from '../../components/FilledButton';

const ProfileThroCreated = () => {
  const {userDetails, sessionToken} = useContext(TokenContext);
  const [throData, setThroData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (sessionToken) {
      getThroEvents(sessionToken);
    }
  }, [sessionToken]);

  const queryParams = {
    page: 1,
    limit: 10,
    include: 1, //0(Others), 1(Only My), 2(All)
  };

  const getThroEvents = async token => {
    try {
      const data = await NetworkService.get(
        BASE_URL + GET_THROS,
        queryParams,
        token,
      );
      setThroData(data.data.data.reverse());
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
            //  navigation.navigate(ROUTE_THRO_DETAILS, {throDetails: item});
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
              {/*  <FilledButton
                onPress={() => setPopupVisible(true)}
                lable={'Catch'}
                height={30}
                width={80}
              /> */}
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

  return (
    <View>
      <FlatList
        style={{height: '100%'}}
        data={throData}
        renderItem={renderItemThro}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default ProfileThroCreated;
