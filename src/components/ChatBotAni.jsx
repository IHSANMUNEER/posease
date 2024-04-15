import React from 'react';
import Lottie from 'lottie-react-native';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BotAni = () => {
    const navigation = useNavigation()
    return (
        <View
            style={{
                justifyContent: 'center',
                height: 'auto',
                width: 50,
                alignItems: 'center',
                backgroundColor: 'white',
                marginLeft: 350,
                borderRadius: 999,
                marginBottom:-50,
                marginTop: 10
            }}>
            <TouchableOpacity onPress={()=> navigation.navigate('ChatBot')}>
                <View>
                    <Lottie
                        style={{ width: 50, height: 50  }}
                        source={require('../assets/ChatBot.json')}
                        autoPlay
                        loop
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
};

export default BotAni;
