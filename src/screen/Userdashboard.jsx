import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../components/colors.jsx';
import UploadInputAni from '../components/UploadInput.jsx';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import TabNavigator from '../components/TabBar.jsx';
import {useFocusEffect} from '@react-navigation/native';

function ProfileScreen({navigation}) {
  //const navigation = useNavigation();

  const [profileImageUri, setProfileImageUri] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTet-jk67T6SYdHW04eIMLygHzEeJKobi9zdg&usqp=CAU',
  );
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [screen, setScreen] = useState('');
  const [name, setName] = useState('');

  const daysOfWeek = [
    {screen: 'Profile', icon: 'user'},
    {screen: 'Subscription', icon: 'dollar-sign'},
  ];

  /////////////////////Use Effect To fetch data from async storage////////////////

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'focus',
      () => {
        const fetchData = async () => {
          const user = await AsyncStorage.getItem('emailS');

          console.log('user', user);
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

              console.log('profile here', profileImageUri);
              console.log('name here', userName);
            } catch (error) {
              console.error('Error fetching data from AsyncStorage:', error);
            }
          }
        };
        fetchData();
        return unsubscribe;
      },
      [navigation],
    );
    return unsubscribe;
  }, []);

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
        setProfileImageUri(media.path);
        saveProfileImageUri(media.path);
        setPhotoUploaded(true);
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
      <ScrollView contentContainerStyle={styles.scrollView}>
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
          ]}>
          {name}
        </Text>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            style={styles.logo}
            source={profileImageUri ? {uri: profileImageUri} : null}
          />
        </TouchableOpacity>
        <UploadInputAni />

        <View style={styles.placeholderText}>
          <Text style={styles.text} onPress={() => pickImageOrVideo()}>
            Upload Image/Video
          </Text>
        </View>
      </ScrollView>

      {/* <Modal
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
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.modal1}
                onPress={() => setScreen(item.screen)}>
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
      </Modal> */}
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
    color: 'black',
  },
  text2: {
    fontSize: 20,
    fontFamily: 'sans-serif-condensed',
    color: color.primary,
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
    right: 180,
    top: -140,
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
    borderRadius: 0,
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
  },
});

export default ProfileScreen;
