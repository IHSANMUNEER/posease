import React, { useState, useCallback, useEffect, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
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
import { GlobalContext } from '../components/GlobalContext.js';

function Userdashboard({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [upload, setUpload] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const { globalVariable } = useContext(GlobalContext);

  useEffect(() => {
    const fetchData = async () => {
      const userUid = await AsyncStorage.getItem('userUID');
      await fetchProfile(userUid);
    };
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const userUid = await AsyncStorage.getItem('userUID');
        await fetchProfile(userUid);
      };
      fetchData();
    }, [])
  );

  const fetchProfile = async (uid) => {
    if (!uid) return;
    try {
      const response = await axios.get(`${globalVariable}/posease/getprofile?uid=${uid}`);
      if (response.data) {
        setUsername(response.data.name);
        setUserImage(response.data.profileuri);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const userUid = await AsyncStorage.getItem('userUID');
      await fetchProfile(userUid);
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
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  useEffect(() => {
    if (upload && photoUploaded) {
      predictImage();
    }
  }, [upload, photoUploaded]);

  const predictImage = async () => {
    if (!upload) return;

    const formData = new FormData();
    formData.append('file', {
      uri: upload,
      type: 'image/jpg',
      name: 'file.jpg',
    });

    try {
      setLoading(true);
      const response = await axios.post(
        'https://2a9a-35-239-154-219.ngrok-free.app/predict',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 200) {
        const result = response.data;
        setUpload(null);
        setPhotoUploaded(false);
        setLoading(false);
        navigation.navigate('Results', {
          imageUrl: result.file_url,
          feedbackText: result.feedback,
          angles: result.angles,
          perfect: result.perfect_angles,
        });
      } else {
        setLoading(false);
        showToast('error', 'Failed', 'Prediction failed with status code: ' + response.status);
      }
    } catch (error) {
      setLoading(false);
      showToast('error', 'Error In sending request', error.message || 'server is not running');
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
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
          {username}
        </Text>

        <Image source={{ uri: userImage }} style={styles.logo} />
        <TouchableOpacity activeOpacity={1} onPress={pickImageOrVideo}>
          <View style={styles.placeholderText}>
            {loading && <Processing />}
            {!loading && <UploadInputAni />}
            {!loading && (
              <Text style={styles.text} onPress={pickImageOrVideo}>
                Upload Image/Video
              </Text>
            )}
            {loading && (
              <Text style={styles.text} onPress={pickImageOrVideo}>
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
    elevation: 10,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.secondary,
  },
  placeholderText: {
    width: 300,
    height: 100,
    borderRadius: 20,
    marginHorizontal: 55,
    borderWidth: 2,
    borderColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    overflow: 'hidden',
    marginTop: 160,
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
