import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import color from '../components/colors.jsx';
import css from '../components/css.jsx';
import Subscription from '../components/Subscription.jsx';
import { NavigationContainer, useNavigation, useFocusEffect } from '@react-navigation/native';
import Loader from '../components/Loader.jsx';

const Subscribe = () => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [waiting, setWaiting] = useState(false);
  const navigation = useNavigation();

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  const handleContinuePress = () => {
    setWaiting(true);
    setTimeout(()=>{
      navigation.navigate('CreditCardInputScreen');
    })
    
  };

  useFocusEffect(
    React.useCallback(() => {
      setWaiting(false);
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      {waiting && <Loader />}
      {!waiting && (
        <View>
          <Subscription />
          <Text style={styles.mainHeading}>Choose your plan</Text>
          <Text style={styles.secondHeading}>
            Subscribed users can save their records for future use
          </Text>
          <TouchableOpacity
            style={[css.input, selectedPlan === 'Monthly' && styles.selectedPlan]}
            onPress={() => handlePlanSelection('Monthly')}
            activeOpacity={1}>
            <Text style={styles.plan}>Monthly</Text>
            <Text style={styles.plandes}>$29.99 / mo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[css.input, selectedPlan === 'Annual' && styles.selectedPlan]}
            onPress={() => handlePlanSelection('Annual')}
            activeOpacity={1}>
            <Text style={styles.plan}>Annual</Text>
            <Text style={styles.plandes}>$15.99 / mo ($192 / year)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continue} onPress={handleContinuePress}>
            <Text style={styles.buttontext}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
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
  selectedPlan: {
    borderColor: color.primary,
    borderWidth: 3,
  },
  continue: {
    width: '90%',
    height: 60,
    marginVertical: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary,
    marginHorizontal: 20,
    fontWeight: '900',
  },
  buttontext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'sans-serif-condensed',
  },
});

export default Subscribe;
