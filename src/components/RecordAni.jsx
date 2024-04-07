import React from 'react';
import Lottie from 'lottie-react-native';
import {View, Dimensions, Text} from 'react-native';
import colours from './colors';

const RecordAni = () => {
    return(
        <View
        style={{
          justifyContent: 'center',
          height: 200,
          width: 200,
          alignItems: 'center',
          backgroundColor: '#FAF9F6',
          marginHorizontal: 90,
          marginVertical: 230
        }}>
        <View>
          <Lottie
            style={{width: 200, height: 200}}
            source={require('../assets/Record.json')}
            autoPlay
            loop
          />
        </View>
      </View>
      )
    };


export default RecordAni;
