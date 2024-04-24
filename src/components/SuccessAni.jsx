import React from 'react';
import Lottie from 'lottie-react-native';
import {View} from 'react-native';

const SuccessAni = () => {
  return(
    <View
    style={{
      justifyContent: 'center',
      height: 300,
      width: 300,
      alignItems: 'center',
      backgroundColor: 'white',
   
      marginVertical: 100,
      marginHorizontal: 80,
      borderRadius:999
    }}>
    <View>
      <Lottie
        style={{width: 300, height: 300}}
        source={require('../assets/Success.json')}
        autoPlay
        loop
      />
    </View>
  </View>
  )
};

export default SuccessAni;
