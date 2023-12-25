import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Text , Image} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import colors from '../components/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import Search from '../components/Search';
import { Rating } from 'react-native-ratings';



const Results = () => {
  const navigation =  useNavigation();
    const imageUrl = 'https://res.cloudinary.com/dm1z4qabv/image/upload/v1702322279/ytuseh25gvjqkohyucal.jpg'
  return (
    <View style={styles.container}>
      <Text style={styles.title}>feedback</Text>
      <Text style={styles.feedback}>
        Positive: Maintaining an upright sitting position is crucial for spine
        health. Tip: Use a chair with good lumbar support and avoid slouching to
        reduce strain on your back.
      </Text>
      <View style={styles.imageContainer} >
      <Image source={{ uri: imageUrl }} style={styles.image}/>

      </View>
      <Rating style={{marginTop: 50 }}/>

      <TouchableOpacity style={styles.continue} onPress={()=>navigation.navigate('Table1')}>
          <Text style={styles.buttontext}>Save Feedback</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: colors.secondary,
  },
  title: {
    color: colors.primary,
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 30,
    marginVertical: 30,
  },
  feedback: {
    color: 'black',
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 10,
  },
  imageContainer: {
    width: 400,
    height: 300,
    marginHorizontal: -3,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: colors.primary

  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    
  },
  continue:{
    width: '90%',
    height: 60,
    marginVertical: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    fontWeight: '900'


  },
  buttontext:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'sans-serif-condensed',
  }
});

export default Results;
