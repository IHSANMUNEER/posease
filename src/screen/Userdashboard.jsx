import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../components/colors.jsx';
import UploadInputAni from '../components/UploadInput.jsx';
import Tips from '../components/Tips.jsx';
import Doctors from '../components/Doctors.jsx';


function ProfileScreen({ navigation }) {
  const [profileImageUri, setProfileImageUri] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTet-jk67T6SYdHW04eIMLygHzEeJKobi9zdg&usqp=CAU',
  );
  const [testImageUri, settestImageUri] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTet-jk67T6SYdHW04eIMLygHzEeJKobi9zdg&usqp=CAU',
  );
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [screen, setScreen] = useState('');
  const [name, setName] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, [refreshing]);

  const fetchData = async () => {
    const user = await AsyncStorage.getItem('emailS');

    if (user) {
      try {
        const storedUserImage = await AsyncStorage.getItem(
          `userProfile_${user}`,
        );
        const userImage = storedUserImage
          ? storedUserImage.replace(/[\[\]"]+/g, '')
          : '';
        setProfileImageUri(userImage);

        const storedUserName = await AsyncStorage.getItem(
          `userName_${user}`,
        );
        const userName = storedUserName
          ? storedUserName.replace(/[\[\]"]+/g, '')
          : '';
        setName(userName);
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      // Your refresh logic here, e.g., fetching new data from an API
      await fetchData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      // After refreshing is complete, set refreshing to false
      setRefreshing(false);
    }
  }, []);

  const pickImageOrVideo = async () => {
    try {
      const media = await ImagePicker.openPicker({
        mediaType: 'any',
        width: 300,
        height: 400,
        cropping: true,
      });

      if (media.path) {
        settestImageUri(media.path);
        //saveProfileImageUri(media.path);
        setPhotoUploaded(true);
        navigation.navigate('Results');
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  const saveProfileImageUri = path => {
    // Add your logic for saving the image path to storage (if needed)
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text
          style={[
            styles.text,
            {
              fontWeight: 'bold',
              fontSize: 15,
              position: 'absolute',
              marginVertical: 20,
              marginHorizontal: 70,
            },
          ]}
        >
          {name}
        </Text>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            style={styles.logo}
            source={profileImageUri ? { uri: profileImageUri } : null}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => pickImageOrVideo()}
        >
          <View style={styles.placeholderText}>
            <UploadInputAni />
            <Text style={styles.text} onPress={() => pickImageOrVideo()}>
              Upload Image/Video
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Today Tips</Text>
        <Tips />
        <Doctors/>
     
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary,
    elevation: 10
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.secondary,
  },

  placeholderText: {
    width: 300,
    height: 100,
    borderRadius: 20,
    marginHorizontal: 60,
    borderWidth: 2,
    borderColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    overflow: 'hidden',
    marginTop: 200,
    
  },

  text: {
    fontSize: 15,
    fontFamily: 'sans-serif-condensed',
    color: 'black',
    fontWeight: 'bold',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 120,
    position: 'absolute',
    marginTop: 150,
    borderWidth: 2,
    borderColor: color.primary,
    marginHorizontal: 10,
    top: -140,
  },
  title: {
    color: color.primary,
    fontWeight: '900',
    textAlign: 'left',
    fontSize: 18,
    marginHorizontal: 30,
    marginTop: 50,

  }
});

export default ProfileScreen;
