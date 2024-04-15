import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Colors,
  CommonStyles,
  Fonts,
  Sizes,
  screenWidth,
} from '../components/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Text } from '../components/commonText';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import MyStatusBar from '../components/myStatusBar';
import NotificationAni from '../components/NotificationAni';
import colors from '../components/colors';
import RecordsSkeleton from '../components/RecordsSkeleton';
import axios from 'axios';

const defaultImage = require('../assets/notification.png'); // Replace with your default image path

const NotificationsScreen = ({ navigation }) => {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('https://api-v20-production.up.railway.app/posease/getallnotifications');
      setListData(response.data.allNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const onPressRow = item => {
    navigation.navigate('NotiDetail', { item });
  };

  const renderItem = data => (
    <View>
      <TouchableOpacity onPress={() => onPressRow(data.item)}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  ...styles.iconWrapStyle,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: colors.primary,
                }}
              >
                <Image
                  source={defaultImage}
                  style={{
                    height: 30,
                    width: 40,
                    borderRadius: 99,
                   
                  }}
                />
              </View>
              <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor18Medium }}>
                  {data.item.title}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    marginTop: Sizes.fixPadding - 5.0,
                    ...Fonts.grayColor15Regular,
                  }}
                >
                  {data.item.description}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: Colors.lightGrayColor,
                height: 1.0,
                marginVertical: Sizes.fixPadding * 2.0,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderHiddenItem = () => <View style={styles.rowBack} />;

  const noNotificationInfo = () => (
    <View style={styles.noNotificationWrapStyle}>
      <NotificationAni />
      <Text
        style={{
          ...Fonts.blackColor19SemiBold,
          marginTop: Sizes.fixPadding * 2.0,
        }}
      >
        No notifications yet
      </Text>
      <Text
        style={{
          marginVertical: Sizes.fixPadding,
          ...Fonts.grayColor16Regular,
          textAlign: 'center',
        }}
      >
        Stay tuned! Notifications about your activity will how up here.
      </Text>
    </View>
  );

  const snackBar = () => (
    <Snackbar
      style={{ backgroundColor: Colors.blackColor }}
      elevation={0}
      visible={showSnackBar}
      onDismiss={() => setShowSnackBar(false)}
    >
      <Text style={{ ...Fonts.whiteColor14Medium }}>
        Notification Dismissed!
      </Text>
    </Snackbar>
  );

  const notificationsInfo = () => {
    return (
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-screenWidth}
        leftOpenValue={screenWidth}
        useNativeDriver={false}
        contentContainerStyle={{ paddingTop: Sizes.fixPadding - 5.0 }}
      />
    );
  };

  const header = () => (
    <View
      style={{
        margin: Sizes.fixPadding * 2.0,
        justifyContent: 'center',
      }}
    >
      <MaterialIcons
        name="keyboard-backspace"
        size={26}
        color={Colors.blackColor}
        style={{ position: 'absolute', zIndex: 100 }}
        onPress={() => {
          navigation.navigate('Userdashboard');
        }}
      />
      <Text style={CommonStyles.headerTextStyle}>Notifications</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {listData.length == 0 ? noNotificationInfo() : notificationsInfo()}
      </View>
      {snackBar()}
    </View>
  );
};

const styles = StyleSheet.create({
  noNotificationWrapStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding * 4.0,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: colors.star,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  iconWrapStyle: {
    width: 60.0,
    height: 60.0,
    borderRadius: 30.0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationsScreen;
