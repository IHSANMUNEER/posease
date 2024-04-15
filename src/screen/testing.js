import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import color from '../components/colors.jsx';

function Testing() {
  const [profileImageUri, setProfileImageUri] = useState(null);
  const [resultImageUri, setresultImageUri] = useState('https://res.cloudinary.com/dm1z4qabv/image/upload/v1701629128/npnjovcyxjhua3iznm9d.jpg');
  const [photoUploaded, setPhotoUploaded] = useState(false);

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
        setProfileImageUri(media.path);
        setPhotoUploaded(true);
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  useEffect(() => {
    predictImage();
  }, [photoUploaded]);

  const predictImage = async () => {
    console.log('here1');
    if (profileImageUri) {
      const formData = new FormData();
      formData.append('image', {
        uri: profileImageUri,
        type: 'image/jpeg',
        name: 'file.jpg',
      });

      try {
        const response = await axios.get('https://53c7-34-125-45-226.ngrok-free.app', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          console.log('here2');
          const result = response.data;
          console.log('Processed Image URL:', result.image_url);
          setresultImageUri(result.image_url);
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={[styles.text, { fontWeight: 'bold', fontSize: 25, position: 'absolute', left: 10, top: 15 }]}>Test Screen</Text>
        <TouchableOpacity onPress={pickImageOrVideo}>
          <Image style={styles.logo} source={profileImageUri ? { uri: profileImageUri } : null} />
        </TouchableOpacity>
        <View style={styles.placeholderText}>
          <Text style={styles.text} onPress={pickImageOrVideo}>Select Image/Video</Text>
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
    marginVertical: 50
  },
  placeholderText: {
    width: 150,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 110,
    marginVertical: 100,
    borderWidth: 3,
    borderColor: color.primary,
  },
  text: {
    fontSize: 16,
    fontFamily: 'sans-serif-condensed',
    color: color.primary,
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
});

export default Testing;
