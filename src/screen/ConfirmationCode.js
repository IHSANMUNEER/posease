import React, { useRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import color from '../components/colors';
import imageS from '../Images/2.png';

const ChangePassword = () => {
  const codeInputs = Array.from({ length: 4 }, (_, index) => useRef(null));

  const handleCodeChange = (index, value) => {
    if (index > 0 && value === '') {
        codeInputs[index - 1].current.focus();
      } else if (index < codeInputs.length - 1 && value !== '') {
        codeInputs[index + 1].current.focus();
      }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image style={styles.logo} source={imageS} />
        <Text style={styles.mainHeading}>Get Your Code</Text>
        <Text style={styles.secondHeading}>
          Please enter the 4-digit code that was sent to your email address
        </Text>

        <View style={styles.codeContainer}>
          {codeInputs.map((ref, index) => (
            <TextInput
              key={index}
              ref={ref}
              style={styles.codeInput}
              keyboardType="numeric"
              maxLength={1}
              editable={true}
              onChangeText={(value) => handleCodeChange(index, value)}
            />
          ))}
        </View>
       

        <TouchableOpacity style={styles.getCode}>
          <Text style={styles.loginButtonText}>Verify and Proceed</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginHorizontal: 80,
    marginVertical: 20,
  },
  secondHeading: {
    marginHorizontal: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  getCode: {
    width: '80%',
    height: 50,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary,
    marginHorizontal: 40,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'sans-serif-condensed',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'white',
    marginHorizontal: 11,
    marginVertical: 10,
    color : 'black'
  },
});

export default ChangePassword;
