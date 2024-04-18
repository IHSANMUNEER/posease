import {
    StyleSheet,
    View,
    Image,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
    ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { Text } from '../components/commonText';
import { Colors, Fonts, Sizes, screenWidth } from '../components/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../components/myStatusBar';
import { GoogleGenerativeAI } from "@google/generative-ai";
import PorofileAni from '../components/ChatBotAni';
import colors from '../components/colors';
const userMessages = [
    {
        id: '1',
        message:
            'Hello!\nHow can i help you today!\n',
        isSender: false,
    },
];

const ChatBot = ({ navigation }) => {
    const [messagesList, setMessagesList] = useState(userMessages);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const API_KEY = "AIzaSyC94mtJb0X05bVkGF5jYxK9Hrkca-2QZYQ";
    const genAI = new GoogleGenerativeAI(API_KEY);

    async function addMessage({ message }) {
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const AmPm = hour >= 12 ? 'pm' : 'am';
        const finalHour = hour > 12 ? hour - 12 : hour;
        const displayHour = finalHour.toString().padStart(2, '0');
        const displayMinute = minute.toString().padStart(2, '0');

        const newMessage = {
            id: messagesList.length + 1,
            message: message,
            messageTime: `${displayHour}:${displayMinute} ${AmPm}`,
            isSender: true,
        };

        setMessagesList(prevMessages => [...prevMessages, newMessage]);
        setLoading(true);

        const lowerCaseMessage = message.toLowerCase();
        const relevantKeywords = [
            "orthopedic",
            "hi",
            "help",
            "doctor",
            "posture",
            "back pain",
            "joint pain",
            "spine",
            "scoliosis",
            "kyphosis",
            "lordosis",
            "muscle imbalance",
            "alignment",
            "ergonomics",
            "physiotherapy",
            "chiropractor",
            "physical therapy",
            "spinal cord",
            "vertebrae",
            "disc herniation",
            "sciatica",
            "osteoporosis",
            "arthritis",
            "carpal tunnel syndrome",
            "tendonitis",
            "plantar fasciitis",
            "knee injury",
            "shoulder injury",
            "hip pain",
            "neck stiffness",
            "whiplash",
            "muscle strain",
            "tension",
            "stress",
            "sedentary lifestyle",
            "workplace ergonomics",
            "pain",
            "chronic",
            "discomfort",
            "ache",
            "spasm",
            "stiffness",
            "soreness",
            "inflammation",
            "relief",
            "treatment",
            "therapy",
            "exercise",
            "stretching",
            "mobility",
            "flexibility",
            "wellness",
            "injury",
            "recovery",
            "management",
            "prevention",
            "rehabilitation",
            "movement",
            "lumbar",
            "thoracic",
            "cervical",
            "nerve",
            "muscle",
            "tissue",
            "ligament",
            "cartilage",
            "tendon",
            "support",
            "cushioning",
            "comfort",
            "stress relief",
            "tension relief"
        ];
        

        const containsKeyword = relevantKeywords.some(keyword => lowerCaseMessage.includes(keyword));

        if (containsKeyword) {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(message);
            const response = await result.response;
            let generatedMessage = response.text();

            generatedMessage = generatedMessage.replace(/\*\*(.*?)\*\*/g, (match, heading) => {
                return `${heading.toUpperCase()}`;
            });

            const generatedResponse = {
                id: newMessage.id + 1,
                message: generatedMessage,
                messageTime: `${displayHour}:${displayMinute} ${AmPm}`,
                isSender: false,
            };

            setMessagesList(prevMessages => [...prevMessages, generatedResponse]);
        } else {
            const genericResponse = {
                id: newMessage.id + 1,
                message: "I'm sorry, I can only assist with orthopedic issues and posture correction.",
                messageTime: `${displayHour}:${displayMinute} ${AmPm}`,
                isSender: false,
            };
            setMessagesList(prevMessages => [...prevMessages, genericResponse]);
        }

        setLoading(false);
    }

    return (
        <KeyboardAvoidingView
            behavior="height"
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardVerticalOffset={0}>
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <MyStatusBar />
                <View style={{ flex: 1 }}>
                    {header()}
                    {renderMessages()}
                    {loading && <ActivityIndicator style={{ marginVertical: 10, }} size="small" color={Colors.primaryColor} />}
                </View>
                {typeMessage()}

            </View>
        </KeyboardAvoidingView>
    );

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="keyboard-backspace"
                        size={26}
                        color={Colors.blackColor}
                        onPress={() => {
                            navigation.pop();
                        }}
                        style={{ marginRight: Sizes.fixPadding * 2.0 }}
                    />
                    <View style={{ borderWidth: 2, borderColor: 'black', borderRadius: 999 }}>
                        <Image
                            source={require('../assets/bot.png')}
                            style={{ width: 50.0, height: 50.0, borderRadius: 23.0 }}
                        />


                    </View>
                    <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding + 2.0 }}>
                        <Text style={{ ...Fonts.blackColor19SemiBold }}>PosEase</Text>
                        <Text style={{ ...Fonts.grayColor16Regular }}>Online</Text>
                    </View>
                </View>
                <MaterialIcons name="more-vert" size={26} color={Colors.blackColor} />
            </View>
        );
    }

    function renderMessages() {
        const renderItem = ({ item }) => {
            return (
                <View
                    style={{
                        alignItems: item.isSender ? 'flex-end' : 'flex-start',
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        marginVertical: Sizes.fixPadding - 2.0,
                    }}>
                    <View
                        style={{
                            ...styles.messageWrapStyle,
                            backgroundColor: item.isSender
                                ? Colors.primaryColor
                                : Colors.extraLightGrayColor,
                        }}>
                        <Text
                            style={
                                item.isSender
                                    ? { ...Fonts.whiteColor16Regular }
                                    : { ...Fonts.grayColor16Regular }
                            }>
                            {item.message}
                        </Text>
                    </View>
                </View>
            );
        };
        return (
            <>

                <View style={{ flex: 1 }}>

                    <FlatList
                        inverted
                        data={messagesList}
                        keyExtractor={item => `${item.id}`}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            flexDirection: 'column-reverse',
                            paddingBottom: Sizes.fixPadding * 2.0,
                            paddingTop: Sizes.fixPadding * 2.0,
                        }}
                    />
                </View>
            </>
        );
    }

    function typeMessage() {
        return (
            <View style={styles.typeMessageWrapStyle}>
                <TextInput
                    cursorColor={Colors.primaryColor}
                    selectionColor={Colors.primaryColor}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Write a message..."
                    style={styles.messageFieldStyle}
                    placeholderTextColor={Colors.grayColor}
                />
                <MaterialIcons
                    name="send"
                    size={20}
                    color={Colors.primaryColor}
                    style={{ marginLeft: Sizes.fixPadding - 5.0 }}
                    onPress={() => {
                        if (message.trim() !== '') {
                            addMessage({ message: message });
                            setMessage('');
                        }
                    }}
                />
            </View>
        );
    }
};

export default ChatBot;

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: Sizes.fixPadding * 2.0,
    },
    typeMessageWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.extraLightGrayColor,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 5.0,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        paddingVertical: Sizes.fixPadding + 3.0,
    },
    messageWrapStyle: {
        padding: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
        maxWidth: screenWidth - 90.0,

    },
    messageFieldStyle: {
        flex: 1,
        ...Fonts.grayColor16Regular,
        marginRight: Sizes.fixPadding,
        padding: 0,

    },
});
