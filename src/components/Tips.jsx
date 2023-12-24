import React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { FlatList, StyleSheet, View } from 'react-native';
import colors from './colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const data = [
    {
      id: '1',
      title: 'Sit up straight',
      subtitle: 'Keep your back aligned with your chair and avoid slouching.',
      image: 'https://picsum.photos/700',
    },
    {
      id: '2',
      title: 'Ergonomic chair',
      subtitle: 'Choose a chair that supports the natural curve of your spine.',
      image: 'https://picsum.photos/701',
    },
    {
      id: '3',
      title: 'Take breaks',
      subtitle: 'Stand up and stretch every 30 minutes to relieve tension.',
      image: 'https://picsum.photos/702',
    },
    {
      id: '4',
      title: 'Sit up straight',
      subtitle: 'Keep your back aligned with your chair and avoid slouching.',
      image: 'https://picsum.photos/700',
    },
    {
      id: '5',
      title: 'Ergonomic chair',
      subtitle: 'Choose a chair that supports the natural curve of your spine.',
      image: 'https://picsum.photos/701',
    },
    {
      id: '6',
      title: 'Take breaks',
      subtitle: 'Stand up and stretch every 30 minutes to relieve tension.',
      image: 'https://picsum.photos/702',
    },
  ]

const Tips = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={1}>
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge"  style={styles.title}>{item.title}</Text>
        <Text variant="bodyMedium" style={[styles.title,{marginBottom: 10}]}>{item.subtitle}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: item.image }}  style={{width: '90%' , marginHorizontal: 12}}/>
      {/* <Card.Actions>
        <Button style={{color:'black'}}>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions> */}
    </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
  
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
    backgroundColor: '#2e7985',
    height:300,
    marginTop: 70

    
  },
  title:{
    color: colors.secondary,
    fontWeight:'bold'

  }
});

export default Tips;
