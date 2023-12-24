import React from 'react';
import Lottie from 'lottie-react-native';
import {View, Dimensions, Text} from 'react-native';
import colours from './colors';

const CardAni = () => {
    return(
        <View
        style={{
          justifyContent: 'center',
          height: 300,
          width: 300,
          alignItems: 'center',
          backgroundColor: 'white',
          marginHorizontal: 15,
          marginVertical: 1,
          marginBottom: -15
        }}>
        <View>
          <Lottie
            style={{width: 300, height: 300}}
            source={require('../assets/Creditcard.json')}
            autoPlay
            loop
          />
        </View>
      </View>
      )
    };


export default CardAni;
