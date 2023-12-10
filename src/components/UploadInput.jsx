import React from 'react';
import Lottie from 'lottie-react-native';
import {View} from 'react-native';

const UploadInputAni = () => {
  return(
    <View
    style={{
      justifyContent: 'center',
      height: 200,
      width: 200,
      alignItems: 'center',
      backgroundColor: '#FAF9F6',
   
      marginVertical: 70,
      marginHorizontal: 90,
      borderRadius:999
    }}>
    <View>
      <Lottie
        style={{width: 200, height: 200}}
        source={require('../assets/upload.json')}
        autoPlay
        loop
      />
    </View>
  </View>
  )
};

export default UploadInputAni;
