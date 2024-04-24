import React from 'react';
import Lottie from 'lottie-react-native';
import {View} from 'react-native';

const Processing = () => {
  return(
    <View
    style={{
      justifyContent: 'center',
      height: 200,
      width: 300,
      alignItems: 'left',
      backgroundColor: 'white',
      marginHorizontal: 110,
      marginTop: 30,
      marginBottom:5
    //   borderRadius:999
    }}>
    <View>
      <Lottie
        style={{width: 300, height: 200}}
        source={require('../assets/processing.json')}
        autoPlay
        loop
      />
    </View>
  </View>
  )
};

export default Processing;
