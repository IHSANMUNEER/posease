import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import colors from '../components/colors';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Results = () => {
    const [rating, setRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('Awaiting feedback...');
    const [imageUrl, setImageUrl] = useState('https://res.cloudinary.com/dm1z4qabv/image/upload/v1702322279/ytuseh25gvjqkohyucal.jpg'); // Placeholder image URL
    const [userUID, setUserUID] = useState('6w7df76wd7wwdra');

    const navigation = useNavigation();

    useEffect(() => {
        async function fetchUserUID() {
            try {
                const uid = await AsyncStorage.getItem('userUID');
                console.log(uid);
                if (uid !== null) {
                    setUserUID(uid);
                }
            } catch (error) {
                console.error('Error fetching user UID:', error);
            }
        }
        fetchUserUID();
    }, []);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSaveFeedback = async () => {
        try {
            const response = await fetch('http://192.168.59.115:3001/posease/addfeedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: userUID,
                    feedbackText,
                    imageUrl,
                    rating,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to save feedback');
            }
            console.log('Feedback saved successfully');
            showToast('success', 'Success', 'Feedback saved successfully');
        } catch (error) {
            console.error('Error saving feedback:', error.message);
            showToast('error', 'Error', 'Failed to save feedback');
        }
    };


    const saveFeedback = () => {
        const mockApiResponse = {
            feedbackText: "Positive feedback from the system",
            imageUrl: "https://res.cloudinary.com/dm1z4qabv/image/upload/v1702322279/ytuseh25gvjqkohyucal.jpg"
        };

        setFeedbackText(mockApiResponse.feedbackText);
        setImageUrl(mockApiResponse.imageUrl);
    };

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Feedback</Text>
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
            </View>
            <Text style={styles.feedback}>{feedbackText}</Text>
            <Rating
                style={{ marginTop: 50 }}
                startingValue={rating}
                onFinishRating={handleRatingChange}
            />
            <TouchableOpacity style={styles.continue} onPress={handleSaveFeedback}>
                <Text style={styles.buttontext}>Save Feedback</Text>
            </TouchableOpacity>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: colors.secondary,
    },
    title: {
        color: colors.primary,
        fontWeight: '900',
        textAlign: 'center',
        fontSize: 30,
        marginVertical: 30,
    },
    feedback: {
        color: 'black',
        fontWeight: '900',
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 10,
    },
    imageContainer: {
        width: 400,
        height: 300,
        marginHorizontal: -3,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 5,
        borderColor: colors.primary,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    continue: {
        width: '90%',
        height: 60,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        marginHorizontal: 20,
        fontWeight: '900',
    },
    buttontext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'sans-serif-condensed',
    },
});

export default Results;
