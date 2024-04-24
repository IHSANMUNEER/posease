import React, { useState, useCallback,useEffect } from 'react';
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
import Processing from '../components/Processing.jsx';
import Toast from 'react-native-toast-message';
import { useFocusEffect, useRoute } from '@react-navigation/native';

function Userdashboard() {
  const [profileImageUri, setProfileImageUri] = useState('data:image/png;base64,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')
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [upload, setUpload] = useState(null);
  const [name, setName] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [newId,setNewUid]=useState('')

  const fetchProfile = async () => {

    const name1 = await AsyncStorage.getItem('userName');
    const imageurl = await AsyncStorage.getItem('imageurl');
    setName(name1);
    setProfileImageUri(imageurl)
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      await fetchProfile();
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
        width: 800,
        height: 800,
        cropping: true,
      });

      if (media.path) {
        setUpload(media.path);
        setPhotoUploaded(true);
        setLoading(true);
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
        setLoading(true);
        const response = await axios.post(
          'https://c628-34-139-140-59.ngrok-free.app/predict',
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
          setProcessedImageUrl(result.file_url);

          navigation.navigate('Results', {
            imageUrl: result.file_url,
            feedbackText: result.feedback,
            angles: result.angles,
            perfect: result.perfect_angles,
          });
          setLoading(false);
        } else {
          setLoading(false);
          showToast('error', 'Failed', 'response');
        }
      } catch (error) {
        setLoading(false);
        showToast('error', 'Error In sending request', 'server is not running');
      }
    } else {
      setLoading(false);
    }
  };

  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
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
        <Text style={[styles.text, {
          fontWeight: 'bold',
          fontSize: 15,
          position: 'absolute',
          marginVertical: 20,
          marginHorizontal: 70,
        }]}>{name}</Text>

  
        <Image source={{ uri: profileImageUri }} style={styles.logo} />
        <TouchableOpacity activeOpacity={1} onPress={() => pickImageOrVideo()}>
          <View style={styles.placeholderText}>
            {loading && (<Processing />)}
            {!loading && (<UploadInputAni />)}
            {!loading && (
              <Text style={styles.text} onPress={() => pickImageOrVideo()}>
                Upload Image/Video
              </Text>
            )}
            {loading && (
              <Text style={styles.text} onPress={() => pickImageOrVideo()}>
                Processing
              </Text>
            )}
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
    //marginTop: 250,
    marginTop: 180,
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

export default Userdashboard;
