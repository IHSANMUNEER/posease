import React from 'react';
import Lottie from 'lottie-react-native';
import {View, Dimensions, Text} from 'react-native';

const ThinkAni = () => {
  return(
    <View
    style={{
      justifyContent: 'center',
      height: 200,
      width: 250,
      alignItems: 'center',
      backgroundColor: 'white',
      marginVertical: 50
    }}>
    <View>
      <Lottie
        style={{width: 450, height: 450 , zIndex: -1}}
        source={require('../assets/think.json')}
        autoPlay
        loop
      />
    </View>
  </View>
  )
};

export default ThinkAni;
