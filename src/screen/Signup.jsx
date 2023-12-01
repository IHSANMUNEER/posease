import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {auth, app, firestore} from '../firebase/firebase';

import {
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import colours from '../components/colors';
import Loader from '../components/Loader';
import Toast from '../components/Toat';




function Signup() {

  ////////Toast////////


//////////////////////////

  const navigation = useNavigation();

  const [eye, setEye] = useState(true);

  const handleEye = () => {
    setEye(!eye);
  };

  const onPressHandler = () => {
    navigation.navigate('Login');
    setWaiting(false);
  };

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [waiting, setWaiting] = useState(false);

  const handleSignUp = async () => {
    if (!username.trim()) {
      // ToastAndroid.show('Invalid Username', 'Please enter a valid username.',ToastAndroid.SHORT);
       Alert.alert('Enter Valid Email');
      //  <Toast ref={ToastRef} message="Hello!"/>
      // return;
    }
    if (!email.trim()) {
      Alert.alert('Invalid Email', 'Please enter a valid Email.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Invalid Password', 'Please enter a valid Password.');
      return;
    }
    if (!confirmpassword.trim()) {
      Alert.alert('Invalid Password', 'Please enter a valid Password.');
      return;
    }
    if (password == confirmpassword) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user;
           Alert.alert('User account created & signed in!');
          AsyncStorage.setItem('userToken', 'user_authenticated');
          AsyncStorage.removeItem('emailS');
          AsyncStorage.setItem('emailS', email);
          sendEmailVerification(user).then(() => {
           
            saveUserData();
            fetchData();
            //navigation.navigate('Login');
          });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
           
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          }

          console.error(error);
        });
    } else {
      Alert.alert(
        'Password Mismatch',
        'Password And Confirm Password Sholud be Same.',
      );
    }
  };

  const saveUserData = async () => {
    try {
      const userDataCollection = collection(firestore, 'userdata');

      await addDoc(userDataCollection, {
        id: auth.currentUser.uid,
        name: username,
        emailId: email,
        passwordS: password,
      });

      console.log('User data added to Firestore successfully!');
    } catch (error) {
      console.error('Error adding user data to Firestore: ', error);
    }
  };

  /////////////////////////////////
  ///////////////////////////Fetching user Data From firestore and saving in ASYNC Storage/////////////////

  const fetchData = async () => {
    const userDataCollection = collection(firestore, 'userdata');

    try {
      const querySnapshot = await getDocs(
        query(userDataCollection, where('emailId', '==', email)),
      );

      const UserEmail = querySnapshot.docs.map(doc => doc.data().emailId);
      const Username = querySnapshot.docs.map(doc => doc.data().name);
      const UserId = auth.currentUser.uid;
      const Userpassword = querySnapshot.docs.map(doc => doc.data().passwordS);

      await AsyncStorage.setItem(
        `userEmail_${email}`,
        JSON.stringify(UserEmail),
      );
      await AsyncStorage.setItem(`userName_${email}`, JSON.stringify(Username));
      await AsyncStorage.setItem(
        `userPassword_${email}`,
        JSON.stringify(Userpassword),
      );
      await AsyncStorage.setItem(`userId_${email}`, JSON.stringify(UserId));
      console.log(`userEmail_${auth.currentUser.uid}`);
      console.log('to set', UserEmail);
      console.log('to set', Username);
      console.log('to set', Userpassword);
      console.log('to set', UserId);
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  ///////////////////////////eye icon handle/////////////////
  ////////////////////////////////
  

  return (
    <>
      {/* {waiting && <Loader />}
      {!waiting && ( */}
      <ScrollView style={styles.container}>
        <View style={styles.screen}>
          <View style={styles.header}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
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
      {/* )} */}
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
  logo: {
    width: 200,
    height: 200,
    marginVertical: 40,
    marginBottom: 2,
    resizeMode: 'contain',
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
