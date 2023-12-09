import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Button
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../components/colors.jsx';
import UploadInputAni from '../components/UploadInput.jsx';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import Toast from 'react-native-toast-message';

function test() {
  const navigation = useNavigation();

  const [profileImageUri, setProfileImageUri] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTet-jk67T6SYdHW04eIMLygHzEeJKobi9zdg&usqp=CAU')
  const [resultImageUri, setresultImageUri] = useState('https://res.cloudinary.com/dm1z4qabv/image/upload/v1701629128/npnjovcyxjhua3iznm9d.jpg')
  
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [screen, setScreen] = useState('');
  const [name, setName] = useState('');

  const daysOfWeek = [
    { screen: 'Profile', icon: 'user' },
    { screen: 'Subscription', icon: 'dollar-sign' },
  ];

  /////////////////////Use Effect To fetch data from async storage////////////////

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const user = await AsyncStorage.getItem('emailS');

  //     console.log('user', user);
  //     if (user) {
  //       try {
  //         const storedUserImage = await AsyncStorage.getItem(
  //           `userProfile_${user}`
  //         );
  //         const userImage = storedUserImage
  //           ? storedUserImage.replace(/[\[\]"]+/g, '')
  //           : '';
  //         setProfileImageUri(userImage);

  //         const storedUserName = await AsyncStorage.getItem(
  //           `userName_${user}`
  //         );
  //         const userName = storedUserName
  //           ? storedUserName.replace(/[\[\]"]+/g, '')
  //           : '';
  //         setName(userName);

  //         console.log('profile here', profileImageUri);
  //         console.log('name here', userName);
  //       } catch (error) {
  //         console.error('Error fetching data from AsyncStorage:', error);
  //       }
  //     }
  //   };
  //   fetchData();
  // }, [name]);

  ////////////////////////////////////////////
  //////////////////Naviagtion//////
  useEffect(() => {
    renderScreen();
  }, [screen]);

  const renderScreen = () => {
    if (screen == 'Profile') {
      navigation.navigate('profileScreen');
    }
    if (screen == 'Subscription') {
      navigation.navigate('Subscribe');
    }
  };
  ////////////////////////////////

  const pickImageOrVideo = async () => {
    try {
      const media = await ImagePicker.openPicker({
        mediaType: 'any',
        width: 300,
        height: 400,
        cropping: true,
      });

      if (media.path) {
        setresultImageUri(media.path);
        saveProfileImageUri(media.path);
        
        setPhotoUploaded(true);
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(()=>{
    predictImage()
  },[photoUploaded])

  const predictImage = async () => {
    console.log('here1')
    if (profileImageUri) {
      const formData = new FormData();
      formData.append('image', {
        uri: resultImageUri,
        type: 'image/jpeg',
        name: 'profile_image.jpg',
      });

      try {
        const response = await axios.post(
          'http://4be6-34-145-131-99.ngrok.io/predict',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 200) {
          console.log('here2')
          const result = await response.data;
                const imageUrl = result.image_url;
                setresultImageUri(imageUrl);
                console.log('Processed Image URL:',imageUrl);
        } else {
          console.error('Prediction failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error sending prediction request:', error);
      }
    } else {
      console.warn('Please select an image first.');
    }
  };




  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
  }

  return (
    <>
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text
          style={[
            styles.text,
            { fontWeight: 'bold', fontSize: 25, position: 'absolute', left: 10, top: 15 },
          ]}>
          Test Screen
        </Text>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            style={styles.logo}
            source={profileImageUri ? { uri: profileImageUri } : null }
          />
        </TouchableOpacity>
        <UploadInputAni />

        <View style={styles.placeholderText}>
          <Text style={styles.text} onPress={() => pickImageOrVideo()}>
            Select Image/Video
          </Text>
        </View>

        <View style={{height : 300 , width : 300 , marginHorizontal : 30, borderWidth : 5 , borderColor: '#A77A00', marginVertical: 20, borderRadius : 25}}>
        <Image
             style={{height : 290 , width : 290  , borderRadius : 20}}
            source={resultImageUri ? { uri: resultImageUri } : null}
          />
        </View>
      </ScrollView>


      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInUp" // Slide in from bottom
        animationOut="slideOutDown" // Slide out to bottom
        style={styles.modal}>
        <View style={styles.modalContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={daysOfWeek}
            horizontal={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modal1}
                onPress={() => setScreen(item.screen)}
              >
                <View style={styles.iconContainer}>
                  <Icon name={item.icon} size={20} color={color.primary} />
                  <Text style={styles.text2} key={item.screen}>
                    {item.screen}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </SafeAreaView>
    <Button
      title='Show toast'
      onPress={showToast}
    />

    <Toast/>
    </>
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

  placeholderText: {
    width: 150,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 110,
    marginVertical: -10,
    borderWidth: 3,
    borderColor: color.primary,
  },
  text: {
    fontSize: 16,
    fontFamily: 'sans-serif-condensed',
    color: color.primary,
  },
  text2: {
    fontSize: 20,
    fontFamily: 'sans-serif-condensed',
    color: color.primary,
    fontWeight: 'bold',
  },

  logo: {
    width: 60,
    height: 60,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 120,
    position: 'absolute',
    marginTop: 150,
    borderWidth: 2,
    borderColor: color.primary,
    right: -100,
    top: -150,
  },
  logoutIcon: {
    position: 'absolute',
    right: 17,
    bottom: 30,
  },

  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: color.primary,
    borderRadius: 20,
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal1: {
    height: 100,
    width: 110,
    marginHorizontal: 5,
    backgroundColor: color.secondary,
    borderRadius: 20,
    fontSize: 20,
    fontFamily: 'sans-serif-condensed',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default test;