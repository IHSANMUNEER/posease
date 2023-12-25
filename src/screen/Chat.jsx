import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {Text} from '../components/commonText';
import {Colors, Fonts, Sizes, screenWidth} from '../components/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../components/myStatusBar';
import { useRoute } from '@react-navigation/native';
import colors from '../components/colors';

const userMessages = [
  {
    id: '1',
    message:
      'Hello!\n\Doctor!\nI am feeling pain in my neck\nand want to book a session. Feugiat habitasse morbi elit\nullamcorper ipsum cras. Morbi pharetraeque\npulvinar venenatis potenti id parturient\ntristique.\n\nBest Regards,\nHiring Manager',
    isSender: false,
  },
  {
    id: '2',
    message: 'Oky',
    isSender: true,
  },
];

const ChatScreen = ({ route, navigation }) => {
    const { doctorInfo } = route.params;
  
    const [messagesList, setMessagesList] = useState(userMessages);
    return (
      <KeyboardAvoidingView
        behavior="height"
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardVerticalOffset={0}>
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
          <MyStatusBar />
          <View style={{ flex: 1 }}>
            {header()}
            {messages()}
          </View>
          {typeMessage()}
        </View>
      </KeyboardAvoidingView>
    );
  
    function header() {
      return (
        <View style={styles.headerWrapStyle}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons
              name="keyboard-backspace"
              size={26}
              color={Colors.blackColor}
              onPress={() => {
                navigation.pop();
              }}
              style={{ marginRight: Sizes.fixPadding * 2.0 }}
            />
            <View style={{borderWidth:2 , borderColor: '#2E7A86', borderRadius:999}}>
            {doctorInfo && (
              <Image
                source={{ uri: doctorInfo.image }}
                style={{ width: 46.0, height: 46.0, borderRadius: 23.0 }}
              />
            )}
            </View>
            <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding + 2.0 }}>
              <Text style={{ ...Fonts.blackColor19SemiBold }}>{doctorInfo.doctorName}</Text>
              <Text style={{ ...Fonts.grayColor16Regular }}>Online</Text>
            </View>
          </View>
          <MaterialIcons name="more-vert" size={26} color={Colors.blackColor} />
        </View>
      );
    }


  function messages() {
    const renderItem = ({item}) => {
      return (
        <View
          style={{
            alignItems: item.isSender == true ? 'flex-end' : 'flex-start',
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginVertical: Sizes.fixPadding - 2.0,
          }}>
          <View
            style={{
              ...styles.messageWrapStyle,
              backgroundColor: item.isSender
                ? Colors.primaryColor
                : Colors.extraLightGrayColor,
            }}>
            <Text
              style={
                item.isSender
                  ? {...Fonts.whiteColor16Regular}
                  : {...Fonts.grayColor16Regular}
              }>
              {item.message}
            </Text>
          </View>
        </View>
      );
    };
    return (
      <View style={{flex: 1}}>
        <FlatList
          inverted
          data={messagesList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'column-reverse',
            paddingBottom: Sizes.fixPadding * 2.0,
            paddingTop: Sizes.fixPadding * 2.0,
          }}
        />
      </View>
    );
  }

  function addMessage({message}) {
    const oldMessages = messagesList;

    let date = Date();
    let hour = new Date(date).getHours();
    let minute = new Date(date).getMinutes();
    let AmPm = hour >= 12 ? 'pm' : 'am';
    let finalhour = hour > 12 ? hour - 12 : hour;
    let displayHour =
      finalhour.toString().length == 1 ? `0${finalhour}` : finalhour;
    let displayMinute = minute.toString().length == 1 ? `0${minute}` : minute;

    const newMessage = {
      id: messagesList.length + 1,
      message: message,
      messageTime: `${displayHour}:${displayMinute} ${AmPm}`,
      isSender: true,
    };

    oldMessages.push(newMessage);
    setMessagesList(oldMessages);
  }

  function typeMessage() {
    const [message, setMessage] = useState('');
    return (
      <View style={styles.typeMessageWrapStyle}>
        <TextInput
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
          value={message}
          onChangeText={setMessage}
          placeholder="Write a message..."
          style={styles.messageFieldStyle}
          placeholderTextColor={Colors.grayColor}
        />
        <MaterialIcons
          name="send"
          size={20}
          color={Colors.primaryColor}
          style={{marginLeft: Sizes.fixPadding - 5.0}}
          onPress={() => {
            if (message != '') {
              addMessage({message: message});
              setMessage('');
            }
          }}
        />
      </View>
    );
  }
};

export default ChatScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: Sizes.fixPadding * 2.0,
  },
  typeMessageWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.extraLightGrayColor,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 5.0,
    paddingHorizontal: Sizes.fixPadding + 2.0,
    paddingVertical: Sizes.fixPadding + 3.0,
  },
  messageWrapStyle: {
    padding: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    maxWidth: screenWidth - 90.0,
    marginBottom:30
  },
  messageFieldStyle: {
    flex: 1,
    ...Fonts.grayColor16Regular,
    marginRight: Sizes.fixPadding,
    padding: 0,
   
  },
});
