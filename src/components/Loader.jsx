import React from 'react';
import Lottie from 'lottie-react-native';
import {View, Dimensions, Text} from 'react-native';
import colours from './colors';

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        height: Dimensions.get('window').height,
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
      <View>
        <Lottie
          style={{width: 100, height: 100}}
          source={require('../assets/loader.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};


export default Loader;
