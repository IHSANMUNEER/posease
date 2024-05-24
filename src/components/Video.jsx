import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUrl }}
        style={styles.video}
        resizeMode="cover"
        controls={true}
        onError={(error) => {
          console.log('Video Error:', error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', 
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default VideoPlayer;
