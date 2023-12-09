import React from 'react';
import Lottie from 'lottie-react-native';
import {View} from 'react-native';

const UploadInputAni = () => {
  return(
    <View
    style={{
      justifyContent: 'center',
      height: 230,
      width: 220,
      alignItems: 'center',
      backgroundColor: '#FAF9F6',
   
      marginVertical: 70,
      marginHorizontal: 80,
      borderRadius:999
    }}>
    <View>
      <Lottie
        style={{width: 250, height: 250}}
        source={require('../assets/upload.json')}
        autoPlay
        loop
      />
    </View>
  </View>
  )
};

export default UploadInputAni;
