import {StyleSheet, View, Animated, Image} from 'react-native';
import React, {useState, useRef} from 'react';
import {
  Colors,
  CommonStyles,
  Fonts,
  Sizes,
  screenWidth,
} from '../components/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text} from '../components/commonText';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Snackbar} from 'react-native-paper';
import MyStatusBar from '../components/myStatusBar';
import NotificationAni from '../components/NotificationAni';

const notificatiosList = [
    {
      key: '1',
      title: 'Dr. John Smith',
      description:
        'Feedback on human posture correction - Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar commodo.',
    },
    {
      key: '2',
      title: 'Dr. Sarah Johnson',
      description:
        'Feedback on human posture correction - Nemo enim ipsam voluptatem quia voluptassit aspernatur aut odit aut fugit, sed quia.',
    },
    {
      key: '3',
      title: 'Dr. Michael Davis',
      description:
        'Feedback on human posture correction - Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nu.',
    },
    {
      key: '4',
      title: 'Dr. Emily White',
      description:
        'Feedback on human posture correction - Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar commodo.',
    },
    {
      key: '5',
      title: 'Dr. Christopher Brown',
      description:
        'Feedback on human posture correction - Additional notification content.',
    },
    {
      key: '6',
      title: 'Dr. Jessica Miller',
      description:
        'Feedback on human posture correction - More notification content.',
    },
   
   
  ];
  

const rowTranslateAnimatedValues = {};

const NotificationsScreen = ({navigation}) => {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [listData, setListData] = useState(notificatiosList);

  Array(listData.length + 1)
    .fill('')
    .forEach((_, i) => {
      rowTranslateAnimatedValues[i] = new Animated.Value(1);
    });


  const animationIsRunning = useRef(false);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {listData.length == 0 ? noNotificationInfo() : notificationsInfo()}
      </View>
      {snackBar()}
    </View>
  );

  function noNotificationInfo() {
    return (
      <View style={styles.noNotificationWrapStyle}>
       
        <NotificationAni/>
        <Text
          style={{
            ...Fonts.blackColor19SemiBold,
            marginTop: Sizes.fixPadding * 2.0,
          }}>
          No notifications yet
        </Text>
        <Text
          style={{
            marginVertical: Sizes.fixPadding,
            ...Fonts.grayColor16Regular,
            textAlign: 'center',
          }}>
          Stay tuned! Notifications about your activity will how up here.
        </Text>
      </View>
    );
  }

  function snackBar() {
    return (
      <Snackbar
        style={{backgroundColor: Colors.blackColor}}
        elevation={0}
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}>
        <Text style={{...Fonts.whiteColor14Medium}}>
          Notification Dismissed!
        </Text>
      </Snackbar>
    );
  }

  function notificationsInfo() {
    const onSwipeValueChange = swipeData => {
      const {key, value} = swipeData;
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

    const renderItem = data => (
      <View>
        <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
          <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  ...styles.iconWrapStyle,
                  backgroundColor: 'rgba(15, 52, 96, 0.1)',
                }}>
                <MaterialCommunityIcons
                  name="doctor"
                  size={28}
                  color={Colors.primaryColor}
                />
              </View>
              <View style={{flex: 1, marginLeft: Sizes.fixPadding + 5.0}}>
                <Text numberOfLines={1} style={{...Fonts.blackColor18Medium}}>
                  {data.item.title}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    marginTop: Sizes.fixPadding - 5.0,
                    ...Fonts.grayColor15Regular,
                  }}>
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
      </View>
    );

    const renderHiddenItem = () => <View style={styles.rowBack} />;

    return (
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-screenWidth}
        leftOpenValue={screenWidth}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
        contentContainerStyle={{paddingTop: Sizes.fixPadding - 5.0}}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  function header() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 2.0,
          justifyContent: 'center',
        }}>
        <MaterialIcons
          name="keyboard-backspace"
          size={26}
          color={Colors.blackColor}
          style={{position: 'absolute', zIndex: 100}}
          onPress={() => {
            navigation.pop();
          }}
        />
        <Text style={CommonStyles.headerTextStyle}>Notifications</Text>
      </View>
    );
  }
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  noNotificationWrapStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding * 4.0,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    flex: 1,
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