import React, { useState, useEffect } from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { FlatList, StyleSheet, View } from 'react-native';
import colors from './colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

const Tips = () => {
  const navigation = useNavigation();
  const [tips, setTips] = useState([]);

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      const response = await fetch('https://api-production-9f8a.up.railway.app/products/gettips');
      const data = await response.json();
      console.log("here")
      setTips(data.tips);
      // Save fetched data to AsyncStorage
      await AsyncStorage.setItem('atips', JSON.stringify(data.tips));
    } catch (error) {
      console.error('Error fetching tips:', error);
      // If fetching from API fails, attempt to get data from AsyncStorage
      try {
        const storedData = await AsyncStorage.getItem('atips');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setTips(parsedData);
        }
      } catch (storageError) {
        console.error('Error fetching tips from AsyncStorage:', storageError);
      }
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('TipsDetail', { item })} activeOpacity={1}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            {item.title}
          </Text>
          <Text variant="bodyMedium" style={[styles.title, { marginBottom: 10, color: colors.secondary }]}>
            {item.subtitle.split(' ').slice(0, 8).join(' ')}
          </Text>
        </Card.Content>
        <Card.Cover
          source={{ uri: item.image }}
          style={{ width: '99%', borderRadius: 7, marginHorizontal: 1, height: '58.5%' }}
        />
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tips}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginRight: 10,
    width: 250,
    backgroundColor: '#358b99',
    height: 214,
    marginTop: 10,
  },
  title: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
});

export default Tips;
