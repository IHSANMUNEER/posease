import React, { useState } from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../components/colors.jsx';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure this import

function EditProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userEmail, userName, userId ,url } = route.params;

  const [profileImageUri, setProfileImageUri] = useState(url);
  const [userEmailState, setUserEmail] = useState(userEmail || '');
  const [userNameState, setUserName] = useState(userName || '');
  const [newName, setNewName] = useState(userName || '');
  const [newId, setNewUid] = useState(userId || '');

  const pickImage = async () => {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    });
    if (image.path) {
      setProfileImageUri(image.path);
      AsyncStorage.setItem('imageurl',image.path)
    }
  };

  const updateProfile = async (uid, newName) => {
    if (!uid) return;
    try {
      const response = await axios.put(`http://10.14.1.236:5001/posease/updateprofile`, {
        uid: uid,
        newName: newName
      });

      setUserName(newName)

      if (response.data) {
        await AsyncStorage.setItem('userName', newName);

        Toast.show({
          type: 'success',
          text1: 'Profile Updated',
          text2: 'Your profile has been successfully updated.'
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.profile}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.profileAvatarWrapper}>
              <Image source={{ uri: profileImageUri }} style={styles.profileAvatar} />
              <View style={styles.profileAction}>
                <Icon name="camera" size={15} color="white" />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.profileBody}>
            <Text style={styles.profileName}>{newName}</Text>
            <Text style={styles.profileAddress}>Software Engineer</Text>
          </View>
          <TextInput
            style={styles.input}
            value={newName}
            editable={true}
            onChangeText={setNewName}
          />
           <View style={styles.user}>
            <Icon name="user" size={20} color={color.primary} />
          </View>
          <TextInput
            style={styles.input}
            value={userEmailState}
            editable={false}
          />
           <View style={styles.email}>
            <Icon name="envelope" size={20} color={color.primary} />
          </View>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => updateProfile(newId, newName)}
          >
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </TouchableOpacity>
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
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: color.primary,
    fontFamily: 'sans-serif-condensed',
    backgroundColor: '#fff',
    color: 'black',
    fontWeight: 'bold',
  },
  updateButton: {
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  user: {
    position: 'absolute',
    right: 70,
    bottom: 175,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
  },
  email: {
    position: 'absolute',
    right: 70,
    bottom: 105,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
  }
});

export default EditProfile;
