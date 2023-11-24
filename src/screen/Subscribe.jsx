import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import color from '../components/colors.jsx';
import css from '../components/css.jsx'
import ImageS from '../Images/4.png';

const Subscribe = () => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Image style={styles.logo} source={ImageS} />

        <Text style={styles.mainHeading}>Membership  Plans</Text>
        <Text style={styles.secondHeading}>
          Subscribed users can save their records for future use
        </Text>

        <TouchableOpacity style={css.input}>
          <Text style={styles.plan}>12 months               60 $</Text>
          <Text style={styles.plandes}>5 $ per month</Text>
          <Text style={styles.plandes}>cancel anytime</Text>
        </TouchableOpacity>

        <TouchableOpacity style={css.input}>
          <Text style={styles.plan}>1 month                     7 $</Text>
          <Text style={styles.plandes}>cancel anytime</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary,
  },
  mainHeading: {
    color: color.primary,
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 30
  },
  secondHeading: {
    marginHorizontal: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color : color.text
  },

  
  plan: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'sans-serif-condensed',
  },
  plandes: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'sans-serif-condensed',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginHorizontal: 100,
    marginTop: 70,
  }
});

export default Subscribe;
