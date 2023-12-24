import React from 'react';
import Lottie from 'lottie-react-native';
import {View} from 'react-native';

const UploadInputAni = () => {
  return(
    <View
    style={{
      justifyContent: 'center',
      height: 100,
      width: 100,
      alignItems: 'center',
      backgroundColor: 'white',
   
      marginVertical: 1,
      marginHorizontal: 110,
      borderRadius:999
    }}>
    <View>
      <Lottie
        style={{width: 100, height: 100}}
        source={require('../assets/upload.json')}
        autoPlay
        loop
      />
    </View>
  </View>
  )
};

export default UploadInputAni;
