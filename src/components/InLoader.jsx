import React from 'react';
import Lottie from 'lottie-react-native';
import {View, Dimensions, Text} from 'react-native';
import colours from './colors';

const InLoader = () => {
  return (
    <View
      style={{
        
        justifyContent: 'center',
        height :40,
        width :40,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius : 100,
        borderColor: '#A77A00',
        borderWidth: 1,
        
      }}>
      <View>
        <Lottie
          style={{width: 40, height: 40}}
          source={require('../assets/loader.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};


export default InLoader;
