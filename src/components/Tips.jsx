import React, { useState, useEffect,useContext } from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { FlatList, StyleSheet, View } from 'react-native';
import colors from './colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonLoader from './SkeletonLoader';
import { GlobalContext } from './GlobalContext';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

const Tips = () => {
  const navigation = useNavigation();
  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      const response = await fetch(`${globalVariable}/posease/gettips`);
      //const response = await fetch('http://10.14.1.156:5001/posease/gettips');
      const data = await response.json();
      console.log("here")
      setTips(data.tips);
      setIsLoading(false);

      await AsyncStorage.setItem('atips', JSON.stringify(data.tips));
    } catch (error) {
      console.error('Error fetching tips:', error);

      try {
        const storedData = await AsyncStorage.getItem('atips');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setTips(parsedData);
          setIsLoading(false);
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
          <Text variant="titleLarge" style={[styles.title, { fontSize: 20 }]}>
            {item.title}
          </Text>
          <Text variant="bodyMedium" style={[styles.title, { marginBottom: 10, color: colors.secondary }]}>
            {item.subtitle.split(' ').slice(0, 3).join(' ')}
          </Text>
        </Card.Content>
        <Card.Cover
          source={{ uri: item.image }}
          style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 9, borderColor:colors.primary , borderWidth :2 }}
        />

      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading ? ( // Conditionally render skeleton loader if loading state is true
        <SkeletonLoader />
      ) : (
        <FlatList
          data={tips}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
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
    width: 240,
    backgroundColor: '#358b99',
    height: 120,
    marginTop: 10,
  },
  title: {
    color: colors.secondary,
    fontWeight: 'bold',
    
  },
});

export default Tips;
