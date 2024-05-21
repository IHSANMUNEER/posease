import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Card, Text } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity, Linking, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../components/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllDoctorSkeleton from './AllDoctorSkeleton';
import { Rating } from 'react-native-ratings';
import { GlobalContext } from './GlobalContext';

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);
  const navigation = useNavigation();

  useEffect(() => {
    fetchDoc();
    const interval = setInterval(checkForUpdates, 900000); 
    return () => clearInterval(interval);
  }, []);

  const fetchDoc = async () => {
    try {
      const response = await fetch(`${globalVariable}/posease/getdoc`);
      const data = await response.json();
      setDoctors(data.tips);
      await AsyncStorage.setItem('doctors', JSON.stringify(data.tips)); 
    } catch (error) {
      console.error('Error fetching doctors:', error);
      const storedData = await AsyncStorage.getItem('doctors');
      if (storedData) {
        setDoctors(JSON.parse(storedData));
      }
    }
  };

  const checkForUpdates = async () => {
    try {
      const response = await fetch(`${globalVariable}/posease/getdoc`);
      const data = await response.json();
      const storedData = await AsyncStorage.getItem('doctors');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (JSON.stringify(parsedData) !== JSON.stringify(data.tips)) {
          setDoctors(data.tips);
          await AsyncStorage.setItem('doctors', JSON.stringify(data.tips));
        }
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  };

  const renderDoctor = useCallback(({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          <Card.Cover source={{ uri: item.image }} style={styles.cover} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.specialization}>{item.specialization}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Qualification:</Text>
            <Text style={styles.value}>{item.education.join(', ')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Experience:</Text>
            <Text style={styles.value}>{item.experience}</Text>
          </View>
          <Text style={styles.location}>{item.location}</Text>
          <Rating
            type="star"
            ratingCount={5}
            startingValue={item.rating}
            imageSize={20}
            readonly
            style={styles.rating}
          />
          <TouchableOpacity style={styles.connectButton} onPress={() => Linking.openURL(item.profileLink)}>
            <Text style={styles.connectButtonText}>Connect</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ), []);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Doctors"
        onChangeText={handleSearch}
        value={searchQuery}
      />
      {filteredDoctors.length > 0 ? (
        <FlatList
          data={filteredDoctors}
          keyExtractor={(item) => item.id.toString()}  // Assuming each doctor has a unique id
          renderItem={renderDoctor}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <AllDoctorSkeleton />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3,
    marginHorizontal: 1
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  imageContainer: {
    marginRight: 16,
  },
  cover: {
    width: 120,
    height: 200,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.primary,
  },
  specialization: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 100,
    color: colors.primary,
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
  location: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
  },
  rating: {
    marginTop: 8,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  connectButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  connectButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AllDoctors;
