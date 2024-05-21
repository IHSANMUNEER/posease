import React, { useState, useCallback,useContext } from 'react';
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
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import colors from '../components/colors.jsx';
import { GlobalContext } from '../components/GlobalContext.js';

function ProfileScreen() {
  const [profileImageUri, setProfileImageUri] = useState('https://res.cloudinary.com/dm1z4qabv/image/upload/v1702322279/ytuseh25gvjqkohyucal.jpg');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [uid, setUid] = useState('');
  const navigation = useNavigation();
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const email = await AsyncStorage.getItem('emailS');
          const name = await AsyncStorage.getItem('userName');
          const uid = await AsyncStorage.getItem('userUID');
          const imageurl = await AsyncStorage.getItem('imageurl');
          const profileImage = await AsyncStorage.getItem(`userProfile_${email}`);
          setProfileImageUri(profileImage);
          setUserEmail(email);
          setUserName(name);
          setProfileImageUri(imageurl)
          setUid(uid);
          console.log('uid',uid)
          fetchProfile(uid);
        } catch (error) {
          console.error('Error loading data from storage:', error);
        }
      };
      fetchData();
    }, [])
  );

  async function fetchProfile(uid) {
    if (!uid) return;
    console.log('inside',uid)
    try {
      const response = await axios.get(`${globalVariable}/posease/getprofile?uid=${uid}`);

      //const response = await axios.get(`http://10.14.1.177:5001/posease/getprofile?uid=${uid}`);
      console.log(response.data)
      if (response.data) {
        setUserName(response.data.name);
        setUserEmail(response.data.email);
        setProfileImageUri(response.data.profileuri)
        await AsyncStorage.setItem('userName', response.data.name);
        await AsyncStorage.setItem('emailS', response.data.email);
        await AsyncStorage.setItem('imageurl', response.data.profileuri);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      if (image.path) {
        setProfileImageUri(image.path);
        await AsyncStorage.setItem(`userProfile_${userEmail}`, image.path);
      }
    } catch (error) {
      console.error('ImagePicker Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.profile}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.profileAvatarWrapper}>
              <Image
                source={{ uri: profileImageUri }}
                style={styles.profileAvatar}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.profileBody}>
            <Text style={styles.profileName}>{userName}</Text>
            {/* <Text style={styles.profileAddress}>Software Engineer</Text> */}
          </View>
          <TouchableOpacity
            style={[styles.editBtn, { marginVertical: 5 }]}
            onPress={() => navigation.navigate('EditProfile', { userId: uid, userEmail: userEmail, userName: userName ,url : profileImageUri})}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            editable={false}
            placeholder="Name"
          />

          <View style={styles.user}>
            <Icon name="user" size={20} color={colors.primary} />
          </View>
          <TextInput
            style={styles.input}
            value={userEmail}
            editable={false}
            placeholder="Email"
          />
           <View style={styles.email}>
            <Icon name="envelope" size={20} color={colors.primary} />
          </View>
        </View>
      </ScrollView>
      <Toast />
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
  editBtn: {
    width: '25%',
    height: 25,
    marginVertical: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary,
    marginHorizontal: 40,
  },
  editText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'sans-serif-condensed',
  },
  user: {
    position: 'absolute',
    right: 70,
    bottom: 105,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
  },
  email: {
    position: 'absolute',
    right: 70,
    bottom: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
  },
});

export default ProfileScreen;
