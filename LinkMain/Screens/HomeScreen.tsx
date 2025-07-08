/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Alert,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import ChatListComponent from '../Components/chatListComponent';
import OnlineComponent from '../Components/onlineComponent';
import TopAppBar from '../Components/topAppBarComponent';

import { SwipeListView } from 'react-native-swipe-list-view';
import { API_BASE_URL } from '../Utils/NgRockLink';
import LottieView from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Text } from 'react-native-gesture-handler';
import { dimensions as  Dimensions} from '../Utils/values';
const screenHeight = Dimensions.screenHeight;
const screenWidth = Dimensions.screenWidth;




type ActiveUser = {
  userID: number;
  username: string;
  profilepic: string;
};

type Chat = {
  chat_id: number;
  name: string;
  is_active: string;
  chat_type: string;
  content: string;
  sent_at: string;
  unreaded: number;
  profilepic: string;
};


type NumberOfUnreadedMessages = {
  chat_id: number;
  unread_count: number;
};

const HomeScreen = () =>{
    const userId = 1;
    const [playLootie,setPlayLootie] = useState(false);

    const [chatsList, setChatsList] = useState<Chat[]>([]);
    const [activeUsersList,setActiveUsersList] = useState<ActiveUser[]>([]);
    const [lastIndex] = useState(chatsList.length - 1);





    function combineUnreadCounts(

      chatsListData:Chat[],
      numberOfUnreadedMessages: NumberOfUnreadedMessages[]
      ): Chat[] {
      const unreadMap = new Map(
        numberOfUnreadedMessages.map(({ chat_id, unread_count }) => [chat_id, unread_count])
      );

      return chatsListData.map(chat => ({
        ...chat,
        unreaded: unreadMap.get(chat.chat_id) ?? 0,
      }));
    }

useFocusEffect(
  useCallback(() => {
    const fetchData = async () => {
      try {
        const chatResponse = await axios.get(`${API_BASE_URL}/api/HomeScreen/GetAllChatsByuserID/${userId}`);
        const activeUsersResponse = await axios.get(`${API_BASE_URL}/api/HomeScreen/GetActiveUsers/${userId}`);
        const numberOfUnreadedResponse = await axios.get(`${API_BASE_URL}/api/HomeScreen/GetAllUnreadMessagesCount/${userId}`);

        setActiveUsersList(activeUsersResponse.data);

        const enriched = combineUnreadCounts(chatResponse.data, numberOfUnreadedResponse.data);
        setChatsList(enriched);

      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [userId])
);

    const handleDelete = (item:number) => {
        setChatsList((prev) => prev.filter((chat) => chat.chat_id !== item));
    };

    const handleMessageSeen = (item:number) => {
        Alert.alert('Archived', `Chat ${item} archived`);

    };

  return(
    <SafeAreaView style={styles.safeArea}>

        <TopAppBar/>
        <FlatList
          data={activeUsersList}
          keyExtractor={(item) => item.userID.toString()}
          renderItem={({item}) => (
              <TouchableOpacity
                  activeOpacity={1} onPress={() => {}}>
                  <OnlineComponent AcUser={item}/>
              </TouchableOpacity>
          )}
          horizontal
          style={styles.onlineList}
        />

        <SwipeListView
        data={chatsList}
        keyExtractor={(item) => item.chat_id.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity
                activeOpacity={1} onPress={() => {}} >
                <ChatListComponent chat={item}/>
            </TouchableOpacity>
        )}


        renderHiddenItem={({item,index}) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backLeftBtn, styles.backBtn ,{ marginBottom: lastIndex === index ? (screenHeight * 0.0646) : 0 }]}
                onPress={() => handleMessageSeen(item.chat_id)}
            >
            <LottieView
                source={require('../Assets/Animations/MessageReaded.json')}
                autoPlay = {playLootie}
                loop={false}
                style={{ width: 50, height: 50 }}
            />
            <Text style={styles.HiddenItemsTitle}>Unread</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={[styles.backRightBtn, styles.backBtn ,{ marginBottom: lastIndex === index ? (screenHeight * 0.0627) : 0 }]}
                onPress={() => handleDelete(item.chat_id)}
            >
            <LottieView
                source={require('../Assets/Animations/trashAnimation.json')}
                autoPlay = {playLootie}
                loop={false}
                style={{ width: 52, height: 52 }}
            />
            <Text style={styles.HiddenItemsTitle}>Delete</Text>
            </TouchableOpacity>

        </View>
        )}
        leftOpenValue={screenWidth * 0.4}
        rightOpenValue={-screenWidth * 0.4}
        swipeToOpenPercent={screenWidth * 0.15}
        disableRightSwipe={false}
        disableLeftSwipe={false}
        showsVerticalScrollIndicator={false}
        closeOnRowPress={true}
        onRowOpen={() => setPlayLootie(true)}
        onRowDidOpen={() => setPlayLootie(false)}
        contentContainerStyle={{flexGrow: 1,paddingBottom: screenHeight * 0.05 }}
      />

    </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  backBtn: {
    width: 75,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  backLeftBtn: {
    backgroundColor: '#4caf50',
  },
  backRightBtn: {
    backgroundColor: '#f44336',
  },
  backTextWhite: {
    color: '#fff',
    fontWeight: 'bold',
  },
  onlineList:{
    height: screenWidth * 0.23,
    maxHeight:screenWidth * 0.23,
    minHeight:screenWidth * 0.23,
    width:'100%',
  },
  HiddenItemsTitle:{
    color:'white',
    fontWeight:'bold',
    fontSize:12,
  },
});


