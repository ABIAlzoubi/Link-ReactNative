/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
// screens/ChatScreen.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    FlatList,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import MessageBubble from '../Components/MessageBubble';
import { Message } from '../Utils/Types';
import { colors, currentUserID as currentUserId} from '../Utils/values';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dimensions } from '../Utils/values';
import { BlurView } from '@react-native-community/blur';
import { API_BASE_URL } from '../Utils/NgRockLink';
import axios from 'axios';

const screenHeight = dimensions.screenHeight;
const screenWidth = dimensions.screenWidth;

type ChatRouteParams = {
  ChatRoomScreen: { chatID: number };
};

const ChatScreen: React.FC = () => {

    const route = useRoute<RouteProp<ChatRouteParams, 'ChatRoomScreen'>>();
    const { chatID } = route.params;

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const flatListRef = useRef<FlatList<Message>>(null);
    const [isLoading,setIsLoading] = useState(true);


    const fetchData = useCallback(async () => {

    try {
        setIsLoading(true);
        const chatResponse = await axios.get(`${API_BASE_URL}/api/Messages/GetChatMessages/${chatID}`);
        setMessages(chatResponse.data);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    } finally {
        setIsLoading(false);
    }
    }, [chatID]);


    useFocusEffect(
        useCallback(() => {
        fetchData();
    }, [fetchData]));






    // useEffect(() => {
    // // connectSocket();
    // // subscribeToMessages();
    // // return () => disconnectSocket();
    // }, []);

const handleSend = () => {
    if (!input.trim()) {return;}
    // setMessages((prev) => [newMessage, ...prev]);


    setInput('');
    // emitToServer(newMessage);
};

return (
<SafeAreaView style={styles.safeArea}>
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
        {!isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: screenHeight * 0.5 }}>
                <ActivityIndicator size="large" color={colors.primaryColor} />
            </View>
        ) : (
        <FlatList
        ref={flatListRef}
        data={messages}
        inverted
        keyExtractor={(item) => item.message_id.toString()}
        renderItem={({ item }) => (
            <MessageBubble message={item}/>
        )}
        contentContainerStyle={{flexGrow: 1,paddingBottom: screenHeight * 0.1 }}
        />)
        }
        <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={input}
                        placeholder="Type a message..."
                        onChangeText={setInput}
                    />
                    <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                        <Text style={{ color: 'white',width:30 }}>Send</Text>
                    </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
</SafeAreaView>
);
};

export default ChatScreen;

const styles = StyleSheet.create({
safeArea: {
    flex: 1,
    backgroundColor: '#fff',
},
blurWrapper: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        elevation: 10,
},
inputContainer: {
    flexDirection: 'row',
    padding: 5,
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
},

input: {
    flex: 1,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 12,
},
sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 8,
},
});
