import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import colors from '../components/colors';


const ImageList = () => {
  const imageUrls = [
    'https://res.cloudinary.com/dm1z4qabv/image/upload/v1702322279/ytuseh25gvjqkohyucal.jpg',
    'https://res.cloudinary.com/dm1z4qabv/image/upload/v1702322335/u9uhol1x8au58pyfga3i.jpg',
    'https://res.cloudinary.com/dm1z4qabv/image/upload/v1702322360/bsbkzqiieq0vksfhd3jy.jpg',
    'https://res.cloudinary.com/dm1z4qabv/image/upload/v1702322385/qp2cm7tztpgdvqw7lspd.jpg',
    'https://res.cloudinary.com/dm1z4qabv/image/upload/v1702322459/w5spswn1t51coihkrnlv.jpg',
    'https://res.cloudinary.com/dm1z4qabv/image/upload/v1702322482/cbvxmrvhjofngpkknnqq.jpg'
    
    // Add more URLs as needed
  ];

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>Image Records</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={imageUrls}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item }} />
          </View>
        )}
      />
    </View>
    
    </>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.primary,
    textAlign : 'center'
  },
  imageContainer: {
    width: 300,
    height: 300,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: colors.primary

  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});

export default ImageList;
