// Import React and necessary components
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
  
} from 'react-native';
import color from '../components/colors';
import imageS from '../Images/2.png';

// Define the ChangePassword component
const ChangePassword = () => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Image style={styles.logo} source={imageS} />
        <Text style={styles.mainHeading}>Mail Address Here</Text>
        <Text style={styles.secondHeading}>
          Enter the email address associated with your account
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          secureTextEntry={true}
          placeholderTextColor="gray"
        />

        <TouchableOpacity
          style={styles.getCode}
         >
          <Text style={styles.loginButtonText}>Recover Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Define the styles for the component
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
    marginVertical: 10
  },
  input: {
    width: '80%',
    height: 50,
    marginVertical: 15,
    marginHorizontal: 40,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: color.primary,
    borderWidth: 1.5,
    fontFamily: 'sans-serif-condensed',
    backgroundColor: '#fff',
    color: 'black',
    
  },
  getCode: {
    width: "80%",
    height: 50,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.primary,
    marginHorizontal :40
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "sans-serif-condensed",
  }
});

export default ChangePassword;
