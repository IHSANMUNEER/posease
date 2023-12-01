import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import color from '../components/colors.jsx';
import css from '../components/css.jsx';
import Lottie from 'lottie-react-native';
import Subscription from '../components/Subscription.jsx';

const Subscribe = () => {
  return (
    <ScrollView style={styles.container}>
      <View>
      <Subscription/>
        
        <Text style={styles.mainHeading}>Subscription Plans</Text>
        <Text style={styles.secondHeading}>
          Subscribed users can save their records for future use
        </Text>
        <TouchableOpacity style={css.input}>
          <Text style={styles.plan}>12 months         49.99$</Text>
          <Text style={styles.plandes}>5 $ per month</Text>
          <Text style={styles.plandes}>cancel anytime</Text>
        </TouchableOpacity>
        <TouchableOpacity style={css.input}>
          <Text style={styles.plan}>1 month              4.99$</Text>
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
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 30,
    marginVertical: 15,
  },
  secondHeading: {
    marginHorizontal: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: color.text,
  },

  plan: {
    color: color.primary,
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'sans-serif-condensed',
  },
  plandes: {
    color: color.primary,
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
  },
});

export default Subscribe;
