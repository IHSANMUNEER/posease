import React from 'react';
import { Avatar, Card, Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
import colors from '../components/colors';
import Doctors from './Doctors';
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';


const DoctorDetail = () => {
  const route = useRoute();
  const { item } = route.params;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.contentContainer}>
          <Card.Cover source={{ uri: item.image }} style={styles.cover} />
          <View style={styles.textContainer}>
            <Text variant="titleLarge" style={styles.title}>
              {item.name}
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              {item.specialization.split(', ').slice(0, 2).join(',')}
              
            </Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.column}>
            <Text
              style={[
                styles.title,
                { marginHorizontal: 10, marginVertical: 10, fontSize: 15 },
              ]}>
              Qualification
            </Text>
            <Text variant="bodyMedium" style={styles.education}>
              {item.education.map((qualification, index) => (
                <React.Fragment key={index}>
                  {index > 0 && '\n'}
                  <Text>{qualification}</Text>
                </React.Fragment>
              ))}
            </Text>
          </View>
          <View style={styles.column}>
            <Text
              style={[
                styles.title,
                { marginHorizontal: 20, marginVertical: 10, fontSize: 15 },
              ]}>
              Experience
            </Text>
            <Text variant="bodyMedium" style={styles.experience}>
              {item.experience}
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.title,
            { marginHorizontal: 30, marginVertical: 10, fontSize: 15 },
          ]}>
          Location
        </Text>
        <Text variant="bodyMedium" style={styles.location}>
          {item.location}
        </Text>
        <Rating
          type="star"
          ratingCount={5}
          startingValue={item.rating}
          imageSize={20}
          readonly
          style={styles.rating}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(item.profileLink)}>
          <Text style={styles.buttonText}>Connect</Text>
        </TouchableOpacity>
        
        
      </Card>
      <View style={{ marginVertical: 50 }}>
        <Doctors />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor : '#ffff',
   

  },
 card: {
  width: '95%',
  borderRadius: 20,
  overflow: 'hidden', 
  elevation: 30,
  backgroundColor: '#ffff',
  

},
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cover: {
    height: 80,
    width: 80,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: colors.primary,
    marginVertical: 10,
    marginHorizontal: 10,
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
    fontSize: 15,
    color: 'black',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 20
    
    
  },
  button: {
    backgroundColor: colors.primary,
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
  experience: {
    marginHorizontal: 20,
  },
  location: {
    marginHorizontal: 40,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  column: {
    flex: 1,
  },
  rating: {
    backgroundColor: '#ffff',
    marginVertical:10
  },
 
});

export default DoctorDetail;
