import React, { useState, useEffect, useContext } from 'react';
import { Card, Text } from 'react-native-paper';
import { StyleSheet, View, FlatList, Image } from 'react-native';
import colors from '../components/colors';
import axios from 'axios';
import { Rating } from 'react-native-ratings';
import { useIsFocused } from '@react-navigation/native';
import RecordsSkeleton from '../components/RecordsSkeleton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecordAni from '../components/RecordAni';
import { GlobalContext } from '../components/GlobalContext';
import VideoPlayer from '../components/Video';

const isVideoUrl = (url) => {
  const videoExtensions = ['.mp4', '.mov', '.wmv', '.flv', '.avi', '.mkv'];
  return videoExtensions.some((ext) => url.endsWith(ext));
};

const Records = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noRecords, setNoRecords] = useState(false);
    const { globalVariable } = useContext(GlobalContext); 
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    const fetchData = async () => {
        try {
            const userUID = await AsyncStorage.getItem('userUID');
            console.log('User UID1:', userUID);

            if (!userUID) {
                console.error('User UID not found in AsyncStorage');
                return;
            }
            const response = await axios.get(`${globalVariable}/posease/getfeedback?uid=${userUID}`);
            const sortedData = response.data.tips.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setRecords(sortedData);
            setLoading(false);

            if (sortedData.length === 0) {
                setNoRecords(true);
            } else {
                setNoRecords(false);
            }
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Records</Text>
            {loading ? (
                <RecordsSkeleton />
            ) : noRecords ? ( 
                <RecordAni />
            ) : (
                <FlatList
                    data={records}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <Card style={styles.card}>
                            <View style={styles.cover}>
                                {console.log(item.mediaUrl)}
                                {isVideoUrl(item.mediaUrl) ? (
                                    <VideoPlayer videoUrl={item.mediaUrl} paused={true} style={styles.video} />
                                ) : (
                                    <Image source={{ uri: item.mediaUrl }} style={styles.image} />
                                )}
                            </View>
                            <Card.Content>
                                <Text variant="titleLarge" style={styles.title}>
                                    Feedback
                                </Text>
                                <Text variant="titleLarge" style={styles.subtitle}>
                                    {item.feedbackText}
                                </Text>
                                <Rating
                                    type="star"
                                    ratingCount={5}
                                    startingValue={item.rating}
                                    imageSize={20}
                                    readonly
                                />
                                <Text style={styles.timestamp}>
                                    Recorded At: {new Date(item.createdAt).toLocaleString()}
                                </Text>
                            </Card.Content>
                        </Card>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            )}
          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: colors.secondary,
        elevation: 10,
    },
    card: {
        marginBottom: 10,
        borderRadius: 15,
        elevation: 5,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: colors.primary,
    },
    cover: {
        height: 400,
        borderRadius: 14,
        marginBottom: 10,
        borderColor: colors.primary,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    video: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: 'black',
    },
    timestamp: {
        fontSize: 14,
        color: '#888',
        marginTop: 8,
    },
    noRecordsText: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Records;
