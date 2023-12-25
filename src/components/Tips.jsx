// Tips.jsx

import React from 'react';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import {FlatList, StyleSheet, View} from 'react-native';
import colors from './colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

const data = [
  {
    id: '1',
    title: 'Sit up straight',
    subtitle: 'Maintain good posture by keeping your back aligned with your chair and avoiding slouching. This helps reduce strain on your spine and promotes a healthier sitting position. Remember to take breaks and stretch periodically to keep your muscles relaxed. Consider using a supportive chair cushion for added comfort during extended periods of sitting. Explore different sitting positions, such as cross-legged or with a footrest, to find what works best for you. Adjust the height of your desk and chair to ensure a comfortable and ergonomic workspace. Implementing these practices can contribute to better overall well-being and productivity.',
    image: 'https://picsum.photos/700',
  },
  {
    id: '2',
    title: 'Ergonomic chair',
    subtitle: 'When choosing a chair, opt for an ergonomic design that supports the natural curve of your spine. This ensures proper lumbar support and enhances overall comfort during long periods of sitting. Consider adjustable features to personalize your seating experience. Additionally, invest in a chair with breathable materials to prevent overheating. Explore different types of ergonomic chairs, such as kneeling chairs or balance ball chairs, to find the one that suits your preferences. Experiment with lumbar rolls or cushions to further enhance your seating arrangement. Your choice of chair plays a crucial role in promoting a comfortable and productive work environment.',
    image: 'https://picsum.photos/701',
  },
  {
    id: '3',
    title: 'Take breaks',
    subtitle: 'To alleviate tension and stiffness, make it a habit to stand up and stretch every 30 minutes. Incorporating short breaks into your routine can contribute to improved circulation and reduced muscle fatigue. Drink water regularly to stay hydrated. Use these breaks to practice deep breathing exercises for relaxation. Consider incorporating quick physical exercises, such as jumping jacks or jogging in place, to boost energy levels. Taking breaks not only benefits your physical well-being but also enhances mental clarity and focus. Implement a timer or reminder system to ensure consistent breaks throughout your workday.',
    image: 'https://picsum.photos/702',
  },
  {
    id: '4',
    title: 'Sit up straight',
    subtitle: 'Maintain good posture by keeping your back aligned with your chair and avoiding slouching. This helps reduce strain on your spine and promotes a healthier sitting position. Remember to take breaks and stretch periodically to keep your muscles relaxed. Consider using a supportive chair cushion for added comfort during extended periods of sitting. Explore different sitting positions, such as cross-legged or with a footrest, to find what works best for you. Adjust the height of your desk and chair to ensure a comfortable and ergonomic workspace. Implementing these practices can contribute to better overall well-being and productivity.',
    image: 'https://picsum.photos/700',
  },
  {
    id: '5',
    title: 'Ergonomic chair',
    subtitle: 'When choosing a chair, opt for an ergonomic design that supports the natural curve of your spine. This ensures proper lumbar support and enhances overall comfort during long periods of sitting. Consider adjustable features to personalize your seating experience. Additionally, invest in a chair with breathable materials to prevent overheating. Explore different types of ergonomic chairs, such as kneeling chairs or balance ball chairs, to find the one that suits your preferences. Experiment with lumbar rolls or cushions to further enhance your seating arrangement. Your choice of chair plays a crucial role in promoting a comfortable and productive work environment.',
    image: 'https://picsum.photos/701',
  },
  {
    id: '6',
    title: 'Take breaks',
    subtitle: 'To alleviate tension and stiffness, make it a habit to stand up and stretch every 30 minutes. Incorporating short breaks into your routine can contribute to improved circulation and reduced muscle fatigue. Drink water regularly to stay hydrated. Use these breaks to practice deep breathing exercises for relaxation. Consider incorporating quick physical exercises, such as jumping jacks or jogging in place, to boost energy levels. Taking breaks not only benefits your physical well-being but also enhances mental clarity and focus. Implement a timer or reminder system to ensure consistent breaks throughout your workday.',
    image: 'https://picsum.photos/702',
  },
];


const Tips = () => {
  const navigation = useNavigation();
  

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => navigation.navigate('TipsDetail', {item})} activeOpacity={1}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            {item.title}
          </Text>
          <Text variant="bodyMedium" style={[styles.title, {marginBottom: 10 , color: colors.secondary}]}>
            {item.subtitle.split(' ').slice(0, 8).join(' ')}
          </Text>
        </Card.Content>
        <Card.Cover
          source={{uri: item.image}}
          style={{width: '97%' , borderRadius:10 ,marginHorizontal: 3 ,height:'58%'  }}
        />
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
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
