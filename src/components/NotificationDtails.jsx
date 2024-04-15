import React from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import colors from '../components/colors';
import Doctors from './Doctors';
const defaultImage = require('../assets/notification.png');

const NotiDetail = () => {
  const route = useRoute();
  const {item} = route.params;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.contentContainer}>
          <Card.Cover source={defaultImage} style={styles.cover} />
          <View style={styles.textContainer}>
            <Text variant="titleLarge" style={styles.title}>
              {item.title}
            </Text>
      
          </View>
        </View>
        <Text
          style={[
            styles.title,
            {marginHorizontal: 20, marginVertical: 20, fontSize: 20},
          ]}>
          Details
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
              {item.description}
            </Text>
        {/* <Text variant="bodyMedium" style={styles.education}>
          {item.education.map((qualification, index) => (
            <React.Fragment key={index}>
              {index > 0 && '\n'}{' '}
              
              <Text>{qualification}</Text>
            </React.Fragment>
          ))}
        </Text> */}
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PaymentSuccess')}>
          <Text style={styles.buttonText}>Connect</Text>
        </TouchableOpacity> */}
      </Card>
      <View style={{marginVertical: 50}}>
      
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    alignItems: 'center',
  },
  card: {
    width: '95%',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 10,
    backgroundColor: 'white'
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cover: {
    height: 50,
    width: 50,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.primary,
    marginVertical: 10,
    marginHorizontal: 8
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    marginHorizontal: 20,
    marginBottom:20
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '60%',
    marginVertical: 30,
    justifyContent: 'center',
    marginHorizontal: 90,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  education: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 20,
  },
});

export default NotiDetail;
