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
import MyStatusBar from '../components/myStatusBar';
import BotAni from '../components/ChatBotAni.jsx';
import axios from 'axios';
import Loader from '../components/Loader.jsx';
import Processing from '../components/Processing.jsx';
import Toast from 'react-native-toast-message';

function ProfileScreen({ navigation }) {
  const [profileImageUri, setProfileImageUri] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTet-jk67T6SYdHW04eIMLygHzEeJKobi9zdg&usqp=CAU',
  );
  
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [upload, setUpload] = useState('');
  const [name, setName] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState('');
  const [loading,setLoading]=useState(false)

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
      await fetchData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const pickImageOrVideo = async () => {
    try {
      const media = await ImagePicker.openPicker({
        mediaType: 'any',
        width: 500,
        height: 500,
        cropping: true,
      });

      if (media.path) {
        setUpload(media.path);
        setPhotoUploaded(true);
        setLoading(true)
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  useEffect(() => {
    console.log('uploaded->', upload);
    predictImage(); 
  }, [upload]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const predictImage = async () => {
    console.log('Predicting image...');
    if (upload) {
      const formData = new FormData();
      formData.append('file', {
        uri: upload,
        type: 'image/jpg',
        name: 'file.jpg',
      });
      

      try {
        setLoading(true)
        const response = await axios.post(
          'https://3ceb-34-143-145-204.ngrok-free.app/predict',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        if (response.status === 200) {
          console.log('Prediction successful');
          const result = response.data;
          console.log('Processed Image URL:', result.file_url);
          console.log('Processed Feedback:', result.feedback);
          setProcessedImageUrl(result.file_url);
          console.log('Response',result)
          navigation.navigate('Results', { imageUrl: result.file_url, feedbackText: result.feedback ,angles: result.angles });
          setLoading(false)
        } else {
          // console.error('Prediction failed:', response.statusText);
          setLoading(false);
          showToast('error', 'Failed' ,'response')  
        }
      } catch (error) {
        // console.error('Error sending prediction request:', error);
        setLoading(false);
        showToast('error', 'Error In sending request' ,'server is not runing')  
      }
    } else {
      // console.warn('Please select an image first.');
      setLoading(false);
      showToast('info','Image Not Selected','select image first')
    }
  };
  const showToast = (type,text1,text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2:text2
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar />

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
       
          <Image
            style={styles.logo}
            source={profileImageUri ? { uri: profileImageUri } : null}
          />


        <TouchableOpacity
          activeOpacity={1}
          onPress={() => pickImageOrVideo()}
        >
          <View style={styles.placeholderText}>
          {loading &&(
            <Processing/>
          )}
          {!loading &&(
            <UploadInputAni />
          )}
            
            <Text style={styles.text} onPress={() => pickImageOrVideo()}>
              Upload Image/Video
            </Text>
          </View>
        </TouchableOpacity>
       
      
        <BotAni />
        <Text style={styles.title}>Today Tips</Text>

        <Tips />
        <Doctors />

      </ScrollView>
      <Toast />
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
    marginHorizontal: 70,
    borderWidth: 2,
    borderColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    overflow: 'hidden',
    marginTop: 240,
    // marginTop: 180,
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
  },
  predictButton: {
    color: color.primary,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  predictedContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  predictedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default ProfileScreen;
