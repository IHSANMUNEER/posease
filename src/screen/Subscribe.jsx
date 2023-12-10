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
        
        <Text style={styles.mainHeading}>Choose your plan</Text>
        <Text style={styles.secondHeading}>
          Subscribed users can save their records for future use
        </Text>
        <TouchableOpacity style={css.input}>
          <Text style={styles.plan}>Monthly</Text>
          <Text style={styles.plandes}>$29,99 / mo</Text>
         
        </TouchableOpacity>
        <TouchableOpacity style={css.input}>
          <Text style={styles.plan}>Annual</Text>
          <Text style={styles.plandes}>$15,99 / mo ($192 / year)</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 10,
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
    fontSize: 20,
    fontFamily: 'sans-serif-condensed',
  },
  plandes: {
    color: '#3B3C36',
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
