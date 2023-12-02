import React from 'react';
import Lottie from 'lottie-react-native';
import {View, Dimensions, Text} from 'react-native';

const ForgotAni = () => {
  return(
    <View
    style={{
      justifyContent: 'center',
      height: 150,
      width: 200,
      alignItems: 'center',
      backgroundColor: 'black',
      marginHorizontal: 80,
      marginVertical: 50
    }}>
    <View>
      <Lottie
        style={{width: 200, height: 150}}
        source={require('../assets/forgot.json')}
        autoPlay
        loop
      />
    </View>
  </View>
  )
};

export default ForgotAni;
