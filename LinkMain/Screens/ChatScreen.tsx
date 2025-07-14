/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
// screens/ChatScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import MessageBubble from '../Components/MessageBubble';
import { Message } from '../Utils/Types';
import { currentUserID as currentUserId} from '../Utils/values';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dimensions } from '../Utils/values';
import { BlurView } from '@react-native-community/blur';

const screenHeight = dimensions.screenHeight;
const screenWidth = dimensions.screenWidth;

type ChatRouteParams = {
    Chat: { chatID: number };
};

const sampleMessages: Message[] = [
  {
    message_id: 1,
    content: "Hey, how's it going?",
    sent_at: new Date().toISOString(),
    deleted_at: '',
    is_deleted: 'N',
    deleter_id: null,
    reply_to_message_id: null,
    sender_id: 1001,
    sender_username: 'Anas',
    sender_Pic: 'https://example.com/anas.jpg',
    status: 'seen',
    status_updated_at: new Date().toISOString(),
    replayed_Message: null,
    reactions: [],
  },
  {
    message_id: 2,
    content: 'All good! You?',
    sent_at: new Date().toISOString(),
    deleted_at: '',
    is_deleted: 'N',
    deleter_id: null,
    reply_to_message_id: 1,
    sender_id: 1002,
    sender_username: 'Salma',
    sender_Pic: 'https://example.com/salma.jpg',
    status: 'delivered',
    status_updated_at: new Date().toISOString(),
    replayed_Message: "Hey, how's it going?",
    reactions: [],
  },
  {
    message_id: 3,
    content: 'Doing great, thanks for asking.',
    sent_at: new Date().toISOString(),
    deleted_at: '',
    is_deleted: 'N',
    deleter_id: null,
    reply_to_message_id: 2,
    sender_id: 1001,
    sender_username: 'Anas',
    sender_Pic: 'https://example.com/anas.jpg',
    status: 'sent',
    status_updated_at: new Date().toISOString(),
    replayed_Message: 'All good! You?',
    reactions: [
      {
        message_id: 3,
        reaction_type: 'love',
        reacted_by_user_id: 1002,
        reacted_by_username: 'Salma',
        reactor_Pic: 'https://example.com/salma.jpg',
      },
    ],
  },
];



const ChatScreen: React.FC = () => {

    const route = useRoute();
    // const { chatID } = route.params || {};

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const flatListRef = useRef<FlatList<Message>>(null);


useEffect(() => {
  setMessages(sampleMessages);
}, []);



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
        <FlatList
        ref={flatListRef}
        data={messages}
        inverted
        keyExtractor={(item) => item.message_id.toString()}
        renderItem={({ item }) => (
            <MessageBubble message={item}/>
        )}
        contentContainerStyle={{flexGrow: 1,paddingBottom: screenHeight * 0.1 }}
        />
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
