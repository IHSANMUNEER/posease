import React from 'react';
import Lottie from 'lottie-react-native';
import {View, Dimensions, Text} from 'react-native';
import colours from './colors';

const NotificationAni = () => {
    return(
        <View
        style={{
          justifyContent: 'center',
          height: 200,
          width: 200,
          alignItems: 'center',
          backgroundColor: 'white',
          marginHorizontal: 90,
          marginVertical: 5
        }}>
        <View>
          <Lottie
            style={{width: 200, height: 200}}
            source={require('../assets/Notification.json')}
            autoPlay
            loop
          />
        </View>
      </View>
      )
    };


export default NotificationAni;
