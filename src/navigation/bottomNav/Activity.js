import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {TitleBarHeader} from '../../components/TitleBarHeader';
import MoreIcon from '../../assets/svgs/MoreIcon';
import {primaryColor, white} from '../../theme/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PERMISSIONS} from 'react-native-permissions';
import {usePermission} from '../../utils/userPermission';

function Activity() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {checkAndRequest} = usePermission();

  const chatTypes = [
    {name: 'All'},
    {name: 'Rate'},
    {name: 'New Thros'},
    {name: 'Accepted'},
    {name: 'Rejected'},
    {name: 'More'},
  ];

  const noData = [
    {
      user_image: '',
      text: 'xyz Accepted your thro',
      action_button: '',
    },
    {
      user_image: '',
      text: '',
      action_button: '',
    },

    {
      user_image: '',
      text: '',
      action_button: '',
    },
  ];

  useEffect(() => {
    handleNotificationPermission();
  }, []);

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

  const handleNotificationPermission = () => {
    checkAndRequest([PERMISSIONS.ANDROID.POST_NOTIFICATIONS], {
      onGranted: () => {
        console.log('Camera permission granted');
      },
      onDenied: () => {
        console.log('Camera permission denied');
      },
      onBlocked: () => {
        console.log('Camera permission blocked — redirecting to settings');
      },
    });
  };

  return (
    <SafeAreaView style={{height: '100%', backgroundColor: white}}>
      <TitleBarHeader
        // leftIcon={<BackIcon />}
        titleBarText={'Activities'}
        //rightIcon={<MoreIcon />}
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
        style={styles.activityList}
        renderItem={renderActivities}
        horizontal={true}
        ItemSeparatorComponent={<View style={{margin: 5}} />}
        keyExtractor={(item, index) => index.toString()}
        extraData={selectedIndex}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  activityList: {
    marginHorizontal: 25,
    marginBottom: 10,
  },
});

export default Activity;
