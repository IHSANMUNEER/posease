import React, { useState, useEffect,useContext } from 'react';
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
const Records = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noRecords, setNoRecords] = useState(false);
    const { globalVariable, setGlobalVariable } = useContext(GlobalContext); 
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
            //const response = await axios.get(`https://api-v20-production.up.railway.app/posease/getfeedback?uid=${userUID}`);
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
                 <RecordAni/>
            ) : (
                <FlatList
                    data={records}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <Card style={styles.card}>
                            <Card.Cover source={{ uri: item.imageUrl }} style={styles.cover} />
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
        
        elevation: 10
    },
    card: {
        marginBottom: 10,
        borderRadius: 15,
        elevation: 5,
        backgroundColor: '#fff',
        borderWidth:1,
        borderColor:colors.primary
    },
    cover: {
        height: 400,
        resizeMode: 'cover',
        borderRadius: 14,
        marginBottom: 10,
        //borderWidth:1.5,
        borderColor:colors.primary
        
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
        marginHorizontal: 140,
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
