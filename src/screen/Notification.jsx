import React, { useState, useRef } from 'react';
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
const notificatiosList = [
  {
    key: '1',
    title: 'Dr. John Smith',
    description:
      'Feedback on human posture correction - Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar commodo.',
    image: 'https://randomuser.me/api/portraits/men/19.jpg',
  },
  {
    key: '2',
    title: 'Dr. Sarah Johnson',
    description:
      'Feedback on human posture correction - Nemo enim ipsam voluptatem quia voluptassit aspernatur aut odit aut fugit, sed quia.',
    image: 'https://randomuser.me/api/portraits/women/20.jpg',
  },
  {
    key: '3',
    title: 'Dr. Michael Davis',
    description:
      'Feedback on human posture correction - Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nu.',
    image: 'https://randomuser.me/api/portraits/men/21.jpg',
  },
  {
    key: '4',
    title: 'Dr. Emily White',
    description:
      'Feedback on human posture correction - Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar commodo.',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
  {
    key: '5',
    title: 'Dr. Christopher Brown',
    description:
      'Feedback on human posture correction - Additional notification content.',
    image: 'https://randomuser.me/api/portraits/men/23.jpg',
  },
  {
    key: '6',
    title: 'Dr. Jessica Miller',
    description:
      'Feedback on human posture correction - More notification content.',
    image: 'https://randomuser.me/api/portraits/women/24.jpg',
  },
];

const rowTranslateAnimatedValues = {};

const NotificationsScreen = ({ navigation }) => {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [listData, setListData] = useState(notificatiosList);
  const [openedRowKey, setOpenedRowKey] = useState(null); // Track the opened row

  Array(listData.length + 1)
    .fill('')
    .forEach((_, i) => {
      rowTranslateAnimatedValues[i] = new Animated.Value(1);
    });

  const animationIsRunning = useRef(false);

  const onRowOpen = (rowKey, rowMap) => {
    setOpenedRowKey(rowKey);
  };

  const onRowClose = rowKey => {
    setOpenedRowKey(null);
  };

  const onSwipeValueChange = swipeData => {
    const { key, value } = swipeData;
    if (
      value > screenWidth ||
      (value < -screenWidth && !animationIsRunning.current)
    ) {
      animationIsRunning.current = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === key);
        newData.splice(prevIndex, 1);
        setListData(newData);
        setShowSnackBar(true);
        animationIsRunning.current = false;
      });
    }
  };

  const onPressRow = item => {
    // Check if the row is currently open, if not, navigate
    if (openedRowKey !== item.key) {
      navigation.navigate('NotiDetail', { item });
    }
  };

  const renderItem = data => (
    <View>
    
      <TouchableOpacity onPress={() => onPressRow(data.item)}>
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
          <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  ...styles.iconWrapStyle,
                  backgroundColor: 'rgba(15, 52, 96, 0.1)',
                }}
              >
                <Image
                  alt=""
                  source={{
                    uri: data.item.image,
                  }}
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 99,
                    borderWidth: 2,
                    borderColor: colors.primary,
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
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
        contentContainerStyle={{ paddingTop: Sizes.fixPadding - 5.0 }}
        showsVerticalScrollIndicator={false}
        onRowOpen={onRowOpen}
        onRowClose={onRowClose}
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
          navigation.pop();
        }}
      />
      <Text style={CommonStyles.headerTextStyle}>Notifications</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
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
    //flex: 1,
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
