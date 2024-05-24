import React, { useState, useEffect,useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { auth } from '../firebase/firebase';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colours from '../components/colors';
import SignUpAni from '../components/SignUpAni';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { GlobalContext } from '../components/GlobalContext';

function Signup() {
  const navigation = useNavigation();

  const [eye, setEye] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [uid, setUid] = useState('');
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

  const handleEye = () => {
    setEye(!eye);
  };

  const onPressHandler = () => {
    navigation.navigate('Login');
    setWaiting(false);
  };

  const handleSignUp = async () => {
    if (!username.trim() || !email.trim() || !password.trim() || !confirmpassword.trim()) {
      showToast();
      return;
    }
    if (password !== confirmpassword) {
      passwordConfirm();
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUid(user.uid);
      await sendEmailVerification(user);
      Varefication();
      addUserdata()
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        showEmailInUse();
      } else if (error.code === 'auth/invalid-email') {
        showToast();
      }
      console.error(error);
    }
  };

  useEffect(() => {
    if (uid) {
      addUserdata();
      AsyncStorage.setItem('userName', username);
      setTimeout(() => {
        navigation.navigate('Login');
      }, 3000);
    }
  }, [uid]);

  const addUserdata = async () => {
    
    const response = await axios.post(`${globalVariable}/posease/adduser`, {
      uid: uid,
      name: username,
      email: email,
    });
    console.log("Response:", response.data);
  };

  const showEmailInUse = () => {
    Toast.show({
      type: 'error',
      text1: 'Email In Use',
      text2: 'This email is already registered',
    });
  };

  const passwordConfirm = () => {
    Toast.show({
      type: 'error',
      text1: 'Password Mismatch',
      text2: 'Password and confirm password should be same',
    });
  };

  const Varefication = () => {
    Toast.show({
      type: 'info',
      text1: 'Verify Email',
      text2: 'Please Verify Email',
    });
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.screen}>
          <View style={styles.header}>
            <SignUpAni />
            <Text style={styles.title}>Create Account</Text>
          </View>
          <View style={styles.form}>
            <TextInput
              value={username}
              placeholder="Name"
              placeholderTextColor="gray"
              style={styles.input}
              onChangeText={setUsername}
            />
            <Icon
              name="user"
              size={20}
              color={colours.primary}
              style={styles.user}
            />
            <TextInput
              value={email}
              placeholder="Email"
              placeholderTextColor="gray"
              style={styles.input}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Icon
              name="envelope"
              size={20}
              color={colours.primary}
              style={styles.email}
            />
            <TextInput
              value={password}
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry={eye}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.lock} onPress={handleEye}>
              <Icon
                name={eye ? 'eye' : 'eye-slash'}
                size={20}
                color={colours.primary}
              />
            </TouchableOpacity>
            <TextInput
              value={confirmpassword}
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="gray"
              secureTextEntry={eye}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.eye2} onPress={handleEye}>
              <Icon
                name={eye ? 'eye' : 'eye-slash'}
                size={20}
                color={colours.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                await handleSignUp();
              }}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
            <Text style={styles.text}>
              Already have an account?{' '}
              <Text style={styles.textLink} onPress={onPressHandler}>
                Login
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.secondary,
  },
  screen: {
    flex: 1,
    backgroundColor: colours.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 2,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: colours.primary,
    marginBottom: 10,
    fontFamily: 'sans-serif-condensed',
  },
  form: {
    flex: 4,
    width: '80%',
    marginBottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    padding: 15,
    marginVertical: 6,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colours.primary,
    borderWidth: 1.5,
    backgroundColor: '#fff',
    color: 'black',
  },
  button: {
    height: 50,
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.primary,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'sans-serif-condensed',
  },
  text: {
    fontSize: 16,
    fontFamily: 'sans-serif-condensed',
    color: colours.text,
  },
  textLink: {
    fontSize: 16,
    color: colours.primary,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed',
  },
  user: {
    position: 'absolute',
    right: 5,
    bottom: 312,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
  },
  email: {
    position: 'absolute',
    right: 5,
    bottom: 248,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
  },
 
  lock: {
    position: 'absolute',
    right: 10,
    bottom: 189,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
  },
  eye2: {
    position: 'absolute',
    right: 10,
    bottom: 128,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
  },
});

export default Signup;
