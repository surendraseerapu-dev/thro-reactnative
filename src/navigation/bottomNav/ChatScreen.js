import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackIcon from '../../assets/svgs/BackIcon';
import {black} from '../../theme/Colors';

const Header = ({title, avatar}) => (
  <View style={styles.headerContainer}>
    <Image source={{uri: avatar}} style={styles.avatar} />
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

const renderBubble = props => {
  return (
    <View>
      <Text style={styles.userName}>{props.currentMessage.user.name}</Text>
      <Bubble
        {...props}
        wrapperStyle={{
          right: {backgroundColor: '#007AFF'},
          left: {backgroundColor: '#E5E5EA'},
        }}
      />
    </View>
  );
};

const GroupChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: 'Hey, how you doing?',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Jack',
        avatar:
          'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
      },
    },
    {
      _id: 2,
      text: 'When are you reaching guys?',
      createdAt: new Date(),
      user: {
        _id: 4,
        name: 'Juilee Dal',
        avatar: 'https://robohash.org/mail@ashallendesign.co.uk',
      },
    },
    {
      _id: 3,
      text: 'Do anybody know any landmark over there?',
      createdAt: new Date(),
      user: {
        _id: 6,
        name: 'Ramy',
        avatar: 'https://baconmockup.com/250/250/',
      },
    },
  ]);

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginVertical: 15,
          marginHorizontal: 20,
          height: '5%',
          flexDirection: 'row',
          width: '90%',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => {}}>
          <BackIcon />
        </TouchableOpacity>

        <Text
          style={{
            color: black,
            fontFamily: 'Nunito-ExtraBold',
            fontSize: 18,
            marginStart: 15,
          }}>
          Camping Event
        </Text>
      </View>

      <GiftedChat
        showUserAvatar={true}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          name: 'You',
          avatar: 'http://placebear.com/250/250',
        }}
        renderBubble={renderBubble}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#007AFF',
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontSize: 12,
    color: '#555',
    marginLeft: 10,
    marginBottom: 2,
  },
});

export default GroupChatScreen;
