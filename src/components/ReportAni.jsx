import React from 'react';
import Lottie from 'lottie-react-native';
import {View, Dimensions, Text} from 'react-native';

const ReportAni = () => {
  return(
    <View
    style={{
      justifyContent: 'center',
      height: 300,
      width: 300,
      alignItems: 'center',
      backgroundColor: 'white',
      marginHorizontal: 20,
      marginVertical: 5,
     
    }}>
    <View>
      <Lottie
        style={{width: 300, height: 300}}
        source={require('../assets/Report.json')}
        autoPlay
        loop
      />
    </View>
  </View>
  )
};

export default ReportAni;
