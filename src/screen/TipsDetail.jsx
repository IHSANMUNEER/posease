
import React from 'react';
import { Avatar, Card, Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import colors from '../components/colors';

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const TipsDetail = () => {
  const route = useRoute();
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: item.image }} style={styles.cover} />
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            {item.title}
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {item.subtitle}
          </Text>
        </Card.Content>
       
      </Card>
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
    width: '98%',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5, 
    backgroundColor: '#eeeeee'
  },
  cover: {
    height: 300,
  },
  title: {
    marginVertical: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.primary
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
});

export default TipsDetail;
