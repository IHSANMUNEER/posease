import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {TextInput, DefaultTheme} from 'react-native-paper';
import colors from '../components/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import SuccessAni from '../components/SuccessAni';
import {useNavigation} from '@react-navigation/native';


  const PaymentSuccess = () => {
    const navigation = useNavigation();
  
    return (
      <>
        <SafeAreaView style={styles.container}>
          <SuccessAni />
          <Text style={styles.title}>Success</Text>
          <Text style={styles.subtitle}>
            Card connected successfully
          </Text>
          <TouchableOpacity 
            style={styles.continue} 
            onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}
          >
            <Text style={styles.buttontext}>Go Back</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    margin: 20,
    marginHorizontal: 30,
  },
  input: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    color: colors.primary,
    fontWeight: '900',
    textAlign: 'center',
    //marginTop: 100,
    borderColor: colors.primary,
    borderWidth: 0,
    marginHorizontal: 80,
    borderRadius: 20,
    borderStyle: 'dotted',
  },
  subtitle:{
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  continue: {
    width: '90%',
    height: 60,
    marginVertical: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
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

export default PaymentSuccess;
