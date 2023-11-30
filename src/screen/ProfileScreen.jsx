import React, {useState, useEffect} from 'react';
import {auth, app, firestore, onAuthStateChanged} from '../firebase/firebase';
import {collection, doc, updateDoc} from 'firebase/firestore';

import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../components/colors.jsx';
import Loader from '../components/Loader';
import {useNavigation} from '@react-navigation/native';

function ProfileScreen() {
  const [profileImageUri, setProfileImageUri] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTet-jk67T6SYdHW04eIMLygHzEeJKobi9zdg&usqp=CAU',
  );

  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [waiting, setWaiting] = useState(true);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    console.log('here');
    const unsubscribe = navigation.addListener(
      'focus',
      () => {
        const fetchData = async () => {
          const user = await AsyncStorage.getItem('emailS');
        
          console.log('user', user);
          if (user) {
            try {
              console.log('here2');
              const storedUserEmail = await AsyncStorage.getItem(
                `userEmail_${user}`,
              );
              const storedUserName = await AsyncStorage.getItem(
                `userName_${user}`,
              );
              console.log('here3');
              const storedUserPassword = await AsyncStorage.getItem(
                `userPassword_${user}`,
              );
              const storedUserImage = await AsyncStorage.getItem(
                `userProfile_${user}`,
              );
              const userEmail = storedUserEmail
                ? storedUserEmail.replace(/[\[\]"]+/g, '')
                : '';
              setUserEmail(userEmail);
              const userName = storedUserName
                ? storedUserName.replace(/[\[\]"]+/g, '')
                : '';
              setUserName(userName);
              const userPassword = storedUserPassword
                ? storedUserPassword.replace(/[\[\]"]+/g, '')
                : '';
              setUserPassword(userPassword);
              const userImage = storedUserImage
                ? storedUserImage.replace(/[\[\]"]+/g, '')
                : '';
              setProfileImageUri(userImage);
              console.log('profile',profileImageUri)
              console.log('name', userEmail);
              console.log('center');
              console.log('username', storedUserName);
            } catch (error) {
              console.error('Error fetching data from AsyncStorage:', error);
            }
          }
        };

        fetchData();

        return unsubscribe;
      },
      [navigation, userName],
    );

    return unsubscribe;
    console.log('here3');
  }, []);

  ////////////////////////

  useEffect(() => {
    if (photoUploaded) {
      saveUserData();
      setPhotoUploaded(false);
    }
  }, [photoUploaded]);

  const saveUserData = async () => {
    try {
      const userDataCollection = collection(firestore, 'userdata');
      const userDoc = doc(userDataCollection, where('emailId', '==', email));
      await updateDoc(userDoc, {
        profileImage: profileImageUri,
      });

      console.log('User data updated in Firestore successfully!');
    } catch (error) {
      console.error('Error updating user data in Firestore: ', error);
    }
  };

  const navigation = useNavigation();

  const saveProfileImageUri = async uri => {
    try {
      const user = await AsyncStorage.getItem('emailS');
      await AsyncStorage.setItem(`userProfile_${user}`, uri);
    } catch (error) {
      console.log('AsyncStorage Error: ', error);
    }
  };

  const getProfileImageUri = async () => {
    try {
      const uri = await AsyncStorage.getItem('');
      if (uri) {
        setProfileImageUri(uri);
      }
    } catch (error) {
      console.log('AsyncStorage Error: ', error);
    }
  };

  useEffect(() => {
    getProfileImageUri();
  }, []);

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      if (image.path) {
        setProfileImageUri(image.path);
        saveProfileImageUri(image.path);
        setPhotoUploaded(true);
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  // Logout//
  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Login');
  };

  const clear = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.profile}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.profileAvatarWrapper}>
              <Image
                alt=""
                source={{
                  uri: profileImageUri,
                }}
                style={styles.profileAvatar}
              />

              <TouchableOpacity onPress={pickImage}>
                <View style={styles.profileAction}>
                  <Icon name="camera" size={15} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View style={styles.profileBody}>
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profileAddress}>Software Engineer</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder={userName}
            secureTextEntry={true}
            placeholderTextColor="black"
            editable={editable}
          />

          <TextInput
            style={styles.input}
            placeholder={userEmail}
            secureTextEntry={true}
            placeholderTextColor="black"
            editable={editable}
          />

          <TextInput
            style={styles.input}
            placeholder={userPassword}
            secureTextEntry={true}
            placeholderTextColor="black"
            value={userPassword}
            editable={editable}
          />

          <TouchableOpacity style={styles.getCode} onPress={() => logout()}>
            <Text style={styles.loginButtonText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.getCode, {marginTop: -20}]}
            onPress={() => navigation.navigate('subscribe')}>
            <Text style={styles.loginButtonText}>Subscription Plans</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.getCode, {marginTop: -20}]}
            onPress={() => clear()}>
            <Text style={styles.loginButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.secondary,
  },
  profile: {
    padding: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.secondary,
    marginVertical: 70,
  },
  profileAvatar: {
    width: 130,
    height: 130,
    borderRadius: 9999,
  },
  profileAvatarWrapper: {
    position: 'relative',
    borderWidth: 4,
    borderRadius: 9999,
    borderColor: color.primary,
  },
  profileAction: {
    position: 'absolute',
    right: 5,
    bottom: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: color.primary,
  },

  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: color.primary,
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    marginTop: 20,
    marginHorizontal: 40,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: color.primary,
    borderWidth: 1.5,
    fontFamily: 'sans-serif-condensed',
    backgroundColor: '#fff',
    color: 'black',
    fontWeight: 'bold',
  },
  getCode: {
    width: '80%',
    height: 50,
    marginVertical: 30,
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
  eye2: {
    position: 'absolute',
    right: 40,
    bottom: 710,
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    borderRadius: 9999,
  },
});

export default ProfileScreen;
