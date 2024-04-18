import React from 'react';
import Lottie from 'lottie-react-native';
import {View} from 'react-native';

const Processing = () => {
  return(
    <View
    style={{
      justifyContent: 'center',
      height: 300,
      width: 300,
      alignItems: 'center',
      backgroundColor: 'white',
   
      marginVertical: 20,
      marginHorizontal: 110,
    //   borderRadius:999
    }}>
    <View>
      <Lottie
        style={{width: 300, height: 300}}
        source={require('../assets/processing.json')}
        autoPlay
        loop
      />
    </View>
  </View>
  )
};

export default Processing;
