import React, { useState, useEffect ,useContext} from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { default as colors } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DoctorSkeletonLoader from './DoctorSkeleton';
import { GlobalContext } from './GlobalContext';

function Doctors() {
  const navigation = useNavigation();
  const [doctors, setDoctors] = useState([]);
  const [item, setItem] = useState();
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

  useEffect(() => {
    fetchDoc();
    const interval = setInterval(checkForUpdates, 900000); 
    return () => clearInterval(interval);
  }, []);

  const fetchDoc = async () => {
    try {
      const response = await fetch(`${globalVariable}/posease/getdoc`);
      //const response = await fetch('https://api-v20-production.up.railway.app/posease/getdoc');
      const data = await response.json();
      const shuffledDoctors = shuffleArray(data.tips); 
      setDoctors(shuffledDoctors);
      await AsyncStorage.setItem('doctors', JSON.stringify(shuffledDoctors)); 
    } catch (error) {
      console.error('Error fetching doctors:', error);
      const storedData = await AsyncStorage.getItem('doctors');
      if (storedData) {
        setDoctors(JSON.parse(storedData));
      }
    }
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const checkForUpdates = async () => {
    try {
      const response = await fetch('https://api-production-9f8a.up.railway.app/products/getdoc');
      const data = await response.json();
      const storedData = await AsyncStorage.getItem('doctors');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (JSON.stringify(parsedData) !== JSON.stringify(data.tips)) {
          const shuffledDoctors = shuffleArray(data.tips); 
          setDoctors(shuffledDoctors);
          await AsyncStorage.setItem('doctors', JSON.stringify(shuffledDoctors));
        }
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  };

  return (
    <View style={styles.professionalsList}>
      <View style={styles.header}>
        <Text style={styles.headerTextLeft}>Health Professionals</Text>
        <Text style={styles.headerTextLeft} onPress={() => navigation.navigate('AllDoctors')}>See All</Text>
      </View>
      {doctors.length > 0 ? (
        <FlatList
          data={doctors}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.professionalsItemContainer, { height: 180 }]}
              onPress={() => navigation.navigate('DoctorDetail', { item })}>
              <View style={styles.professionalsImageContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.professionalsItemImage}
                  containerStyle={styles.professionalsImageBorder}
                />
              </View>
              <Text style={styles.professionalsItemName}>{item.name.split(' ').slice(0, 3).join(' ')}</Text>
              <Text style={styles.professionalsItemSpecialization}>{item.specialization.split(' ').slice(0, 2).join(' ')}</Text>
              <View style={styles.ratingContainer}>
                {Array.from({ length: Math.floor(item.rating) }, (v, i) => (
                  <Icon key={i} name="star" size={10} color={colors.star} />
                ))}
                {item.rating % 1 !== 0 && (
                  <Icon name="star-half" size={20} color={colors.star} backgroundColor={colors.star} />
                )}
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <DoctorSkeletonLoader />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerTextLeft: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  professionalsItemContainer: {
    color: colors.primary,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#358b99',
    marginLeft: 10,
    marginBottom: 10,
  },
  professionalsImageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
    color: colors.primary,
    borderWidth: 2,
    marginHorizontal: 15,
    borderColor: colors.secondary,
  },
  professionalsItemImage: {
    width: 80,
    height: 80,
  },
  professionalsImageBorder: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  professionalsItemName: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  professionalsItemSpecialization: {
    color: colors.secondary,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    color: colors.star,
    fontSize: 14,
    marginLeft: 5,
  },
  offlineMessage: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.primary,
    fontSize: 16,
  },
});

export default Doctors;
